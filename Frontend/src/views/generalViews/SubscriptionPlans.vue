<script lang="ts" setup>
import Navbar from '@/components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import 'primeicons/primeicons.css'
import Button from 'primevue/button';

const subscriptionPlans = [
    {
        id: "plan_001",
        suitableFor: "For big companies",
        suitableForName: 'Enterprise',
        description: "Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit. ",
        price: 19.99,
        duration: {
            duration_type: "Month",  // corresponds to DyrationType.month
            duration: 1
        },
        promo_codes: [
            {
                promo_code: "WELCOME10",
                discount_percent: 10
            }
        ],
        image: '/public/images/paperPlan.png',
        freatures: [
            "Access to 5 courses",
            "Community support",
            "Basic progress tracking"
        ]
    },
    {
        id: "plan_002",
        suitableFor: "For big companies",
        suitableForName: 'Enterprise',
        description: "Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit. ",
        price: 49.99,
        duration: {
            duration_type: "Year",
            duration: 1
        },
        discount: null,
        promo_codes: [],
        image: "/public/images/paperPlan.png",
        freatures: [
            "Unlimited course access",
            "Certificate of completion",
            "Downloadable content"
        ]
    },
    {
        id: "plan_003",
        suitableFor: "For big companies",
        suitableForName: 'Enterprise',
        description: "Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit. ",
        price: 199,
        duration: {
            duration_type: "Life Time",
            duration: 1
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
        image: "/public/images/paperPlan.png",
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
    <div id="sub_plans_main_title">
        <h3 id="sub_plans_pricing">PRICING</h3>
        <h1 id="sub_plans_title">Simple, transparent pricing</h1>
        <p id="sub_plans_description">Lorem ipsum dolor sit amet consectetur adipiscing elit dolor posuere vel venenatis eu sit massa volutpat.</p>
    </div>

    <div id="sub_palns_con">

        <div class="sub_plan_card" v-for="plan in subscriptionPlans">

            <div class="sub_plan_header">
                <img class="main_image" :src="plan.image" alt="">
                <div class="header_title">
                    <p style="color: #6F6C90;">{{ plan.suitableFor }}</p>
                    <p style="color: #170F49;">{{ plan.suitableForName }}</p>
                </div>
            </div>
            <p class="sub_plan_des">{{ plan.description }}</p>
            <div class="pricing">
                <h1 style="font-size: 3rem;">${{ plan.price }}</h1>
                <p style="color: var(--header); font-size: 1.125rem;font-weight: 500;">/ {{ plan.duration.duration }} {{ plan.duration.duration_type }}</p>
            </div>
            <div class="sub_plan_feature_con">
                <p style="font-size: 1rem;font-weight: 700;margin-bottom: 1.5rem;"> What's included</p>
                <div class="sub_plan_features" v-for="feature in plan.freatures">
                    <i class="pi pi-check" style="color: #4A3AFF;background-color:#01ABFF ;border-radius: 100%;padding: 0.5rem;width: 2rem;"></i>
                    <p>{{ feature }} </p>
                </div>
            </div>
            <div class="sub_plan_btn_con">
                <Button label="Get Started" :pt="{label:{style:'font-weight:700;font-size:1rem'}}" />
            </div>
            <!-- <div class="sub_plan_discount" v-if="plan.discount">
                <h2>- {{ plan.discount?.percent }} %</h2>
                <p>{{ plan.discount?.end_date.split("T")[0] }}</p>
            </div> -->
        </div>
    </div>
    <Footer />

</template>



<style scoped>
button{
    border: none;
    height: 5.125rem;
}
.header_title>p{
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    line-height: 1.5rem;
}
.main_image {
    width: 5rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--pricing_background);
}

#sub_plans_main_title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 6.25rem;
    margin-inline: auto;
    text-align: center;
    padding-inline: 2rem;
    font-family: "DM Sans", sans-serif;
}

#sub_plans_pricing {
    color: var(--accent1);
    font-weight: 700;
    line-height: 1.375rem;
    font-size: 1rem;
    margin: 0;
    letter-spacing: 10%;
}

#sub_plans_title {
    color: #170F49;
    line-height: 4.25rem;
    font-size: 3rem;
    margin-top: 2rem;
    margin-bottom: 0.875rem;
}

#sub_plans_description {
    color: var(--text);
    font-size: 1rem;
    margin: 0;
    max-width: 40rem;
    line-height: 2rem;
    font-weight: 400;
}

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
    font-size: 1rem;
    font-weight: 400;
    color: var(--header);
}

.sub_plan_features {
    display: flex;
    gap: 1rem;
    align-items: start;
    margin-bottom: 1rem;
}

.sub_plan_feature_con {
    margin-bottom: 3rem;
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
    color: #6F6C90;
    font-size: 1rem;
    font-weight: 500;
}

.sub_plan_header>p {
    padding: 0;
    margin: 0;
    font-weight: bolder;
    color: var(--accent1);
    font-size: 1rem;
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


.sub_plan_card {
    border-radius: 1.5rem;
    border: 2px solid var(--accent1);
    box-shadow: 0 2 12 0 rgba(20, 20, 43, 0.08);
    width: 28rem;
    padding: 3.125rem;
    position: relative;
    overflow: hidden;
}
.sub_plan_card:nth-child(2){
    transform: translate(0,-3rem);
}

#sub_palns_con {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin-block: 15rem;
    padding-inline: 2rem;
}
</style>