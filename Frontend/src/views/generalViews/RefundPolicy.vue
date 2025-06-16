<script lang="ts" setup>
import Navbar from '@/components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import { useLang } from '@/stores/token';
const lang = useLang()
</script>

<template>

    <div>
        <Navbar />
        <div class="container" v-if="lang.getLang == 'en'">
            <div class="tab-content translations-content-item en visible" id="en">


                <h1>Refund and Exchange Policy</h1>

                <h3>1. Refund and Exchange Policy Overview</h3>
                <p>
                    This Refund and Exchange Policy (“Policy”) applies to all purchases made through the Trace EdTech online platform, including but not limited to digital track subscriptions, online courses, educational bundles, and personalized learning services. By making a purchase, the user (“Customer”) agrees to the terms outlined herein.
                </p>

                <h3>2. Eligibility for Refunds</h3>

                <h4>2.1 Time Limit</h4>
                <p>
                    Refund requests must be submitted within <strong>14 calendar days</strong> of the purchase date. Requests made after this period will not be eligible for consideration.
                </p>

                <h4>2.2 Content Usage Threshold</h4>
                <p>
                    A refund may be granted only if the Customer has accessed no more than <strong>25%</strong> of the purchased course, subscription’s first course, or digital product. If the system records show that over 25% of the content has been accessed, completed, or downloaded, the refund request will be automatically declined.
                </p>

                <h4>2.3 Promotional and Discounted Purchases</h4>
                <p>
                    Courses or subscriptions purchased using promotional codes, discounts, or special offers may be excluded from refunds unless explicitly stated during the promotion.
                </p>

                <h4>2.4 Non-Refundable Categories</h4>
                <ul>
                    <li>Fully delivered digital services or products.</li>
                    <li>Customized educational programs tailored specifically to the Customer.</li>
                    <li>Annual or bundled subscriptions once more than 25% of the first course or product in the bundle has been accessed, completed, or downloaded.</li>
                </ul>

                <h3>3. Process for Requesting a Refund</h3>

                <h4>3.1 Submission</h4>
                <p>
                    The Customer must submit a refund request by emailing <strong>info@traceedtech.com</strong> with the following information:
                </p>
                <ul>
                    <li>Full name and account email.</li>
                    <li>Order number or purchase confirmation.</li>
                    <li>Detailed reason for the refund request.</li>
                </ul>

                <h4>3.2 Review Timeline</h4>
                <p>
                    Upon receiving the refund request, Trace’s support team will review the eligibility within <strong>5 business days</strong> and notify the Customer via email of the approval or rejection of the request.
                </p>

                <h4>3.3 Refund Decision</h4>
                <p>
                    Approved refunds will be processed to the original payment method. The Customer should allow <strong>7–10 business days</strong> for the amount to reflect, depending on their financial institution.
                </p>

                <h3>4. Exchange Policy</h3>

                <h4>4.1 Exchange Window</h4>
                <p>
                    Customers may request to exchange one course or subscription for another of equal or lesser value within <strong>14 calendar days</strong> of purchase, provided that the original course has not been accessed beyond the <strong>50%</strong> threshold.
                </p>

                <h4>4.2 Upgrade Exchanges</h4>
                <p>
                    If the Customer wishes to exchange for a course or product of higher value, the Customer will be required to pay the price difference before the exchange is processed.
                </p>

                <h4>4.3 How to Exchange</h4>
                <p>
                    Exchange requests should be submitted to <strong>info@traceedtech.com</strong> with the same details as listed in Section 3.1.
                </p>

                <h3>5. Additional Terms</h3>

                <h4>5.1 Fraud or Abuse</h4>
                <p>
                    Trace reserves the right to refuse refunds or exchanges if fraudulent activity, abuse of the refund policy, or violation of the platform’s Terms of Service is detected.
                </p>

                <h4>5.2 Local Law Compliance</h4>
                <p>
                    This Policy does not override any applicable local consumer protection laws that may grant the Customer additional rights regarding refunds or exchanges.
                </p>

                <h4>5.3 Policy Updates</h4>
                <p>
                    Trace reserves the right to amend or update this Policy at any time. Changes will be posted on the platform, and continued use constitutes acceptance of those changes.
                </p>




            </div>
        </div>

        <div class="container" style="direction: rtl;" v-if="lang.getLang == 'ar'">
            <div class="tab-content translations-content-item ar visible" id="ar">

                <section>
                    <h1>سياسة الاسترجاع والاستبدال</h1>

                    <h3>1 نظرة عامة على سياسة الاسترجاع والاستبدال</h3>
                    <p>
                        تنطبق هذه <strong>السياسة</strong> على جميع المشتريات التي تتم عبر منصة Trace EdTech الإلكترونية، بما في ذلك — على سبيل المثال لا الحصر — الاشتراكات الرقمية والدورات التعليمية والحزم التعليمية والخدمات التعليمية المُخصصة.
                        وبإتمام عملية الشراء، يقرّ المستخدم (العميل) بقبوله للأحكام المنصوص عليها هنا.
                    </p>

                    <h3>شروط أهلية الاسترجاع</h3>

                    <h4>2.1 المدة الزمنية</h4>
                    <p>يجب تقديم طلب الاسترجاع خلال <strong>14 يومًا</strong> من تاريخ الشراء. لن يُقبل أي طلب يُقدَّم بعد هذه المدة.</p>

                    <h4>2.2 حدود استخدام المحتوى</h4>
                    <p>
                        يُقبل طلب الاسترجاع فقط إذا كان العميل قد استخدم <strong>أقل من 25٪</strong> من محتوى الدورة أو الاشتراك أو المنتج الرقمي المشتَرى.
                        إذا أظهرت سجلات النظام أن أكثر من 25٪ من المحتوى قد تم الوصول إليه أو استكماله أو تنزيله، فسيتم رفض الطلب تلقائيًا.
                    </p>

                    <h4>2.3 المشتريات الترويجية والمخفَّضة</h4>
                    <p>قد لا تكون الدورات أو الاشتراكات التي تم شراؤها باستخدام أكواد ترويجية أو خصومات أو عروض خاصة مؤهلة للاسترجاع، إلا إذا ذُكر ذلك صراحة أثناء العرض الترويجي.</p>

                    <h4>2.4 الفئات غير القابلة للاسترجاع</h4>
                    <ul>
                        <li>المنتجات أو الخدمات الرقمية التي تم تقديمها بالكامل.</li>
                        <li>البرامج التعليمية المُخصصة المصممة خصيصًا للعميل.</li>
                        <li>الاشتراكات السنوية أو الحزم المجمعة بعد استخدام أكثر من 25٪ من أول دورة أو منتج ضمن الحزمة.</li>
                    </ul>

                    <h3>إجراءات طلب الاسترجاع</h3>

                    <h4>3.1 طريقة التقديم</h4>
                    <p>يجب على العميل تقديم طلب الاسترجاع عبر البريد الإلكتروني إلى <strong>info@traceedtech.com</strong> مع إرفاق المعلومات التالية:</p>
                    <ul>
                        <li>الاسم الكامل والبريد الإلكتروني المرتبط بالحساب.</li>
                        <li>رقم الطلب أو تأكيد الشراء.</li>
                        <li>سبب واضح ومفصّل لطلب الاسترجاع.</li>
                    </ul>

                    <h4>3.2 مدة المراجعة</h4>
                    <p>ستقوم فرق الدعم في Trace بمراجعة الأهلية خلال <strong>5 أيام عمل</strong>، وسيتم إعلام العميل بقرار الموافقة أو الرفض عبر البريد الإلكتروني.</p>

                    <h4>3.3 آلية إعادة الأموال</h4>
                    <p>
                        في حال الموافقة، سيتم تحويل المبلغ إلى <strong>وسيلة الدفع الأصلية</strong>. قد يستغرق ظهور المبلغ <strong>7 إلى 10 أيام عمل</strong> حسب المؤسسة المالية.
                    </p>

                    <h3>سياسة الاستبدال</h3>

                    <h4>4.1 فترة الاستبدال</h4>
                    <p>يحق للعميل طلب استبدال دورة أو اشتراك بآخر ذو قيمة مساوية أو أقل خلال <strong>14 يومًا</strong>، بشرط ألا يكون قد تجاوز 50٪ من محتوى الدورة الأصلية.</p>

                    <h4>4.2 الاستبدال مع دفع الفارق</h4>
                    <p>إذا رغب العميل في استبدال المنتج بآخر ذي قيمة أعلى، فسيُطلب منه دفع الفارق قبل تنفيذ الاستبدال.</p>

                    <h4>4.3 كيفية طلب الاستبدال</h4>
                    <p>يُقدَّم طلب الاستبدال عبر إرسال بريد إلكتروني إلى <strong>info@traceedtech.com</strong> متضمنًا التفاصيل المذكورة في القسم 3.1.</p>

                    <h3>أحكام إضافية</h3>

                    <h4>5.1 الحالات الاحتيالية أو إساءة الاستخدام</h4>
                    <p>تحتفظ Trace بالحق في رفض أي طلب استرجاع أو استبدال في حال اكتشاف نشاط احتيالي، أو إساءة استخدام للسياسة، أو مخالفة لشروط الاستخدام.</p>

                    <h4>5.2 التوافق مع القوانين المحلية</h4>
                    <p>لا تتجاوز هذه السياسة أي حقوق قانونية قد تمنحها قوانين حماية المستهلك المحلية.</p>

                    <h4>5.3 تحديثات السياسة</h4>
                    <p>تحتفظ Trace بالحق في تعديل أو تحديث هذه السياسة في أي وقت. سيتم نشر التحديثات على المنصة، ويُعد استخدام المنصة المستمر بمثابة قبول لها.</p>


                </section>



            </div>
        </div>



        <Footer />
    </div>

</template>



<style scoped>
.container {
    padding: 2rem;
    max-width: 60rem;
    margin-inline: auto;
    margin-bottom: 4rem;
}

h1 {
    color: var(--accent1);
    margin-bottom: 0;
    padding-bottom: 0;
}

h2,
h3,
h4 {
    color: var(--accent2);
    margin-bottom: 0;
    padding-bottom: 0;
}

p {
    padding: 0;
    margin: 0;
}

a {
    text-decoration: none;
}
</style>