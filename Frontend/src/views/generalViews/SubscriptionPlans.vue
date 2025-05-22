<script lang="ts" setup>
import Navbar from '@/components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import 'primeicons/primeicons.css'
import Button from 'primevue/button';

const subscriptionPlans = [
    {
        id: "plan_001",
        name: "Basic Plan",
        description: "A great starting point for learners with big passion.",
        price: 19.99,
        duration: {
            duration_type: "Month",  // corresponds to DyrationType.month
            duration: 1
        },
        discount: {
            percent: 10,
            end_date: "2025-08-01T00:00:00Z"
        },
        promo_codes: [
            {
                promo_code: "WELCOME10",
                discount_percent: 10
            }
        ],
        image: "https://example.com/images/basic.png",
        freatures: [
            "Access to 5 courses",
            "Community support",
            "Basic progress tracking"
        ]
    },
    {
        id: "plan_002",
        name: "Pro Plan",
        description: "Full access with certificates and premium features.",
        price: 49.99,
        duration: {
            duration_type: "Year",
            duration: 1
        },
        discount: null,
        promo_codes: [],
        image: "https://example.com/images/pro.png",
        freatures: [
            "Unlimited course access",
            "Certificate of completion",
            "Downloadable content"
        ]
    },
    {
        id: "plan_003",
        name: "Lifetime Plan",
        description: "One-time payment for lifetime access to all content.",
        price: 199.99,
        duration: {
            duration_type: "Life Time",
            duration: 1
        },
        discount: {
            percent: 20,
            end_date: "2025-12-31T23:59:59Z"
        },
        promo_codes: [
            {
                promo_code: "LIFETIME20",
                discount_percent: 20
            },
            {
                promo_code: "SAVEFOREVER",
                discount_percent: 15
            }
        ],
        image: "https://example.com/images/lifetime.png",
        freatures: [
            "Lifetime course access",
            "All future updates",
            "Priority support"
        ]
    }
]


</script>



<template>
    <Navbar />

    <div id="sub_palns_con">

        <div class="sub_plan_card" v-for="plan in subscriptionPlans">

            <div class="sub_plan_header">
                <i class="pi pi-box"></i>
                <p>{{ plan.name }}</p>
            </div>
            <p class="sub_plan_des">{{ plan.description }}</p>
            <div class="pricing">
                <h1>{{ plan.price }} L.E</h1>
                <p>/ {{ plan.duration.duration }} {{ plan.duration.duration_type }}</p>
            </div>
            <div class="sub_plan_feature_con">
                <p> What's included</p>
                <div class="sub_plan_features" v-for="feature in plan.freatures">
                    <i class="pi pi-check-circle"></i>
                    <p>{{ feature }} </p>
                </div>
            </div>
            <div class="sub_plan_btn_con">
                <Button label="Get Started" />
            </div>
            <div class="sub_plan_discount" v-if="plan.discount">
                <h2>- {{ plan.discount?.percent }} %</h2>
                <p>{{ plan.discount?.end_date.split("T")[0] }}</p>
            </div>
        </div>
    </div>
    <Footer />

</template>



<style scoped>
.sub_plan_discount>p {
    font-size: 0.75rem;
    font-weight: bold;
}

.sub_plan_discount>* {
    margin: 0;
    padding: 0;
}
.sub_plan_discount {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translate(37.5%, 7.5%) rotate(45deg);
    width: 18rem;
    background-color: #FF3B30;
    color: #FFD700;
}

.sub_plan_btn_con>button {
    width: 80%;
    border-radius: 20rem;
    background-color: var(--accent1);
    transition-duration: 1s;
}

.sub_plan_btn_con {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.sub_plan_features>i {
    color: var(--accent1);

}

.sub_plan_features>p {
    margin: 0;
    padding: 0;
}

.sub_plan_features {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    align-items: center;
}

.sub_plan_feature_con>p {
    font-weight: bolder;
}

.pricing>p {
    color: var(--text);
    font-weight: bolder;
}

.pricing>* {
    margin: 0;
    padding: 0;
}

.pricing {
    display: flex;
    align-items: end;
    gap: 0.5rem;
}

.sub_plan_des {
    color: var(--text);
}

.sub_plan_header>p {
    padding: 0;
    margin: 0;
    font-weight: bolder;
    color: var(--accent1);
    font-size: 1.125rem;
}

.sub_plan_header>i {
    font-size: 3rem;
    color: var(--accent5);
}

.sub_plan_header {
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 1rem;

}

.sub_plan_card:hover {
    transform: translate(0, -1rem);
}

.sub_plan_card {
    border-radius: 1.5rem;
    box-shadow: rgba(1, 170, 255, 1) 0px 0px 4px 0px;
    width: 18rem;
    padding: 1.5rem;
    transition-duration: 500ms;
    position: relative;
    overflow: hidden;
}

#sub_palns_con {
    min-height: 60vh;
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin-block: 5rem;
    padding-inline: 2rem;
}
</style>