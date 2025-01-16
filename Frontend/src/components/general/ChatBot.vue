<script setup lang="ts">

import {GoogleGenerativeAI} from '@google/generative-ai'
const API_KEY = 'AIzaSyB6WTXMQsbP9QJCe1ymDInuXRQ0a_uk4uQ'

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
generationConfig: {
    temperature: 1,
  },
 });
const chat = model.startChat({
  history: [],
});


const question = ref('')
const answer = ref('')

async function submitQuestion(){

    const result = await chat.sendMessage(question.value);
    answer.value= result.response.text()
}

import { ref } from 'vue'
import { Chat } from '@chat-ui/vue3'
const data = ref<any[]>([])


async function handleSendEvent(input:any) {
    if (input == '') return;
    const messagePerson = {
        type: 'person',
        message: input
    }
    data.value.push(messagePerson)
    question.value = input
    await submitQuestion()
    const messageBot = {
        type: 'chatbot',
        message: parseMarkdown(answer.value)
    }
    data.value.push(messageBot)
   
}

function parseMarkdown(text: string): string {

  // Replace ## heading with <h2> HTML tags
  let parsedText = text.replace(/##/g, '');
  parsedText = parsedText.replace(/\*\*/g, '');
  parsedText = parsedText.replace(/\*/g, '');
  
  return parsedText;
}
</script>


<template>
    <div class="chat" style="background-color: blue;">

    <Chat
    class="chat"
    :onSend="handleSendEvent"
    :chat="data"

    bgColorHeader="#7302ff"


    bgColorChat="#C8E7EF"
    

    bgColorInput="#ffffff"

    bgColorIcon="#7302ff"

    bgColorMessageChatbot="#fff"
    textColorMessageChatbot="#282828"

    bgColorMessagePerson="#7302ff"
    
    textColorInput="#282828"

    textColorHeader="#fff"
    
    textColorMessagePerson=""

    colorOnline="#7302ff"
    inputHeight="3rem"
    width="25rem"
    height="70vh"
    boxShadow=""
    fillColorIcon="#fff"
    
    />
    </div>
    


</template>

<style scoped>
.chat{
    z-index: 3;
    position: relative;
}
div{
    padding: 0;
    margin: 0;
    line-height: 1rem;
}

</style>