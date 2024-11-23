<script lang="ts" setup>
import ChildSidebar from "../../components/general/ChildSidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { selectLang, translationModule } from "@/lib/Translate";
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePersonalInfo } from "@/stores/token";

import { register } from "vue-advanced-chat";

register(); // Initialize chat

const loadded = ref(false);
const route = useRoute();
const router = useRouter();
function extractDate(dateTimeString: string) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function extractTime(dateTimeString: string) {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

const personalInfo = usePersonalInfo();
// Define the reactive state
const currentUserId = personalInfo.getInfo?.id
const currentRoomId = computed(() => {
  if (route.params?.id){
    return route.params?.id;
  }
 
});
watch((currentRoomId),()=>{
    loadded.value=false
    fetchMessages()
})
const rooms = ref<any[]>([]);
const messages = ref<any[]>([]);

// Define the methods
const fetchMessages = () => {
  rooms.value = [];
  messages.value = [];
  new HttpRequester("get_chats").callApi().then((res: any) => {
    if (res?.success) {
      let chats = res?.data?.chat;
      for (let i = 0; i < chats?.length; i++) {
        let parts = chats[i]?.participants;
        for (let i = 0; i < parts?.length; i++) {
          parts[i]._id = parts[i]?.id;
        }
        rooms.value.push({
          roomId: chats[i]?.id,
          roomName: chats[i]?.course_title,
          avatar: chats[i]?.avatar,
          users: parts,
        });
      }
      let messagesWithoutUpdate = chats?.find((chat: any) => {
        return chat?.id == route.params?.id;
      })?.messages;
      for (let i = 0; i < messagesWithoutUpdate?.length; i++) {
        messagesWithoutUpdate[i]._id = messagesWithoutUpdate[i].id;
        messages.value.push(messagesWithoutUpdate[i]);
      }
      loadded.value = true;
    }
  });
};

fetchMessages();
const sendMessage = (message: any) => {
  let date = new Date();
  let data = {
    chat_id: message?.roomId,
    message: {
      content: message?.content,
      senderId: personalInfo.getInfo?.id,
      username: personalInfo.getInfo?.email,
      date: extractDate(String(date)),
      timestamp: extractTime(String(date)),
      id: messages.value.length,
    },
  };
  router.push(`/childChats/${message?.roomId}`);
  new HttpRequester("send_message").callApi(data).then((res) => {
    if (res?.success) {
      fetchMessages();
    }
  });
};
</script>

<template>
  <Navbar />
  <div class="container">
    <ChildSidebar class="sidebar" selected="Chats" />
    <div class="wrapper">
      <vue-advanced-chat
        height="80vh"
        :current-user-id="currentUserId"
        :rooms="JSON.stringify(rooms)"
        :rooms-loaded="loadded"
        :room-id="currentRoomId"
        :messages="JSON.stringify(messages)"
        :messages-loaded="loadded"
        :load-first-room="true"
        :show-add-room="false"
        :show-files="false"
        :show-audio="false"
        @send-message="sendMessage($event.detail[0])"
        @fetch-messages="
          router.push(`/childChats/${$event.detail[0].room.roomId}`)
        "
      />
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 12rem 1fr;
  min-height: 100vh;
}
.wrapper {
  padding: 2rem;
}

@media screen and (max-width: 1000px) {
  .container {
    grid-template-columns: 90vw;
    min-height: 100vh;
  }
  .sidebar {
    display: none;
  }
}
</style>
