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
                <h1>Terms and Conditions</h1>
                <p> Last updated: February 18, 2025</p>
                <h2>Introduction</h2>
                <p>These Terms and Conditions ("Terms") govern your use of the website and services provided by Trace EdTech ("the Company", "We", "Us", or "Our"), accessible from <a href="https://www.traceedtech.com">https://www.traceedtech.com</a>. By accessing and using this Website, You agree to comply with these Terms. If You do not agree with any part of these Terms, You must not use this Website.</p>
                <h2>Interpretation and Definitions</h2>
                <h3>Interpretation</h3>
                <p>Words where the initial letter is capitalized have defined meanings under the following conditions. The definitions shall apply regardless of whether they appear in singular or plural.</p>
                <h3>Definitions</h3>
                <ul>
                    <li>

                        <p><strong>Affiliate:</strong> An entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of shares, equity interest, or other voting rights.</p>
                    </li>
                    <li>

                        <p><strong>Country:</strong> Egypt</p>
                    </li>
                    <li>

                        <p><strong>Company:</strong> Trace EdTech, Giza, 6th of October.</p>
                    </li>
                    <li>

                        <p><strong>Device:</strong> Any device that can access the Service, such as a computer, cellphone, or tablet.</p>
                    </li>
                    <li>

                        <p><strong>Service:</strong> The Website and any associated digital services.</p>
                    </li>
                    <li>

                        <p><strong>Third-party Social Media Service:</strong> Any external service or content that may be integrated or displayed within the Website.</p>
                    </li>
                    <li>

                        <p><strong>You:</strong> The individual accessing or using the Service, or the legal entity on whose behalf such individual is acting.</p>
                    </li>
                </ul>

                <h2>Acknowledgment</h2>
                <p>These Terms constitute the agreement between You and the Company regarding your use of the Service. Your access to and use of the Service is conditioned upon Your acceptance of and compliance with these Terms. If You disagree with any part, You must cease using the Service.
                    You must be over 18 years of age to use the Service. The Company does not permit those under 18 to access or use the Service,
                    <strong>except for children between the ages of 6-16, who may use the Service with explicit parental or legal guardian consent.</strong>
                </p>

                <p>
                    Your use of the Service is also governed by our <strong>Privacy Policy</strong>, which details our practices regarding data collection, use, and security.
                </p>
                <h2>Intellectual Property Rights</h2>
                <p>Other than the content You own, Trace EdTech and/or its licensors own all intellectual property rights and materials contained on this Website. You are granted a <strong>limited license </strong> only for purposes of viewing the material contained on this Website.
                </p>
                <h2>Restrictions</h2>
                <p>You are <strong>specifically restricted</strong> from:</p>
                <ul>
                    <li>Publishing any Website material in any other media without authorization.</li>
                    <li>Selling, sub-licensing, or otherwise commercializing any Website material.
                    </li>
                    <li>Publicly performing or displaying any Website material without consent.
                    </li>
                    <li>Using the Website in any way that is damaging to its availability or performance.
                    </li>
                    <li>Engaging in any data mining, data harvesting, or similar activities related to this Website.
                    </li>
                    <li>Using the Website for any unlawful or fraudulent purpose.
                    </li>
                </ul>
                <p>Certain areas of this Website may be restricted, and the Company reserves the right to further restrict access at any time, at its sole discretion.
                </p>
                <h2>Your Content
                </h2>
                <p>Any content You display on the Website ("Your Content") must be <strong>non-exclusive, worldwide, irrevocable, sublicensable license </strong> original and must not infringe on third-party rights. By displaying Your Content, You grant the Company a to use, reproduce, adapt, publish, and distribute it across any media.</p>
                <p>The Company reserves the right to remove any of Your Content without notice.
                </p>
                <h2>Links to Other Websites</h2>
                <p>Our Service may contain links to third-party websites or services that are not owned or controlled by the Company. The Company assumes no responsibility for the content, privacy policies, or practices of any third-party websites or services.</p>
                <h2>Termination</h2>
                <p>The Company reserves the right to <strong>terminate or suspend Your access</strong> immediately, without notice, for any violation of these Terms. Upon termination, Your right to use the Service ceases immediately.</p>
                <h2>Limitation of Liability</h2>
                <p>To the maximum extent permitted by law, the Company and its affiliates shall not be liable for:</p>
                <ul>
                    <li>Any indirect, incidental, special, or consequential damages arising from Your use of the Service.</li>
                    <li>Any loss of data, revenue, or business interruption caused by the use or inability to use the Service.</li>
                </ul>
                <p>If any jurisdiction does not allow certain limitations, liability will be limited to the <strong>greatest extent permitted by law.</strong>

                </p>
                <h2>"AS IS" and "AS AVAILABLE" Disclaimer</h2>
                <p>The Service is provided <strong>"AS IS" and "AS AVAILABLE"</strong> without any warranty of any kind. The Company makes no warranties that the Service will:</p>
                <ul>
                    <li>Be error-free or uninterrupted.</li>
                    <li>Meet Your specific requirements.</li>
                    <li>Be free from viruses, malware, or harmful components.</li>
                </ul>
                <p>Some jurisdictions do not allow the exclusion of warranties, so some limitations may not apply to You.</p>

                <h2>Governing Law & Dispute Resolution</h2>
                <p>These Terms shall be governed by the <strong>laws of Egypt</strong>, excluding conflict of law provisions. Any disputes arising from these Terms will be settled under the exclusive jurisdiction of Egyptian courts.</p>
                <p>For EU consumers, mandatory legal protections provided under the laws of Your residence apply.</p>

                <h2>Severability</h2>
                <p>If any provision of these Terms is found to be unenforceable, it shall be modified or removed without affecting the validity of the remaining provisions.</p>
                <h2>Changes to These Terms</h2>
                <p>We reserve the right to modify or replace these Terms at any time. If a change is material, We will provide at least <strong>30 days' notice </strong> before the new terms take effect.</p>
                <p>By continuing to use the Service after the revisions become effective, You agree to be bound by the revised terms.</p>
                <h2>Contact Us
                </h2>
                <p>If You have any questions about these Terms, You can contact us:</p>
                <p><strong>By email</strong>: <a href="mailto:Info@traceedtech.com">Info@traceedtech.com</a></p>

            </div>
        </div>

        <div class="container" style="direction: rtl;" v-if="lang.getLang == 'ar'">
            <div class="tab-content translations-content-item ar visible" id="ar">
                <h1>الشروط والأحكام</h1>
                <p>آخر تحديث: 18 فبراير 2025</p>

                <section>
                    <h2>المقدمة</h2>
                    <p>
                        تحكم هذه الشروط والأحكام ("الشروط") استخدامك للموقع والخدمات المقدمة من قبل تريس إيدتك ("الشركة"، "نحن"، "لنا"، أو "خاصتنا")، المتاحة على
                        <a href="https://www.traceedtech.com">https://www.traceedtech.com</a>>. من خلال الوصول إلى هذا الموقع واستخدامه، فإنك توافق على الامتثال لهذه الشروط. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك استخدام هذا الموقع.
                    </p>
                </section>

                <section>
                    <h2>التفسير والتعريفات</h2>
                    <h3>التفسير</h3>
                    <p>الكلمات التي تبدأ بحرف كبير لها معاني محددة وفقًا للشروط التالية. تنطبق التعريفات بغض النظر عما إذا كانت بصيغة المفرد أو الجمع.</p>
                    <h3>التعريفات</h3>
                    <ul>
                        <li><strong>الشركة التابعة:</strong> أي كيان يتحكم فيه طرف أو يكون تحت سيطرته أو يخضع لسيطرة مشتركة، حيث تعني "السيطرة" ملكية 50٪ أو أكثر من الأسهم أو حقوق التصويت.</li>
                        <li><strong>البلد:</strong> مصر.</li>
                        <li><strong>الشركة:</strong> تريس إيدتك، الجيزة، 6 أكتوبر.</li>
                        <li><strong>الجهاز:</strong> أي جهاز يمكنه الوصول إلى الخدمة، مثل الكمبيوتر أو الهاتف المحمول أو الجهاز اللوحي.</li>
                        <li><strong>الخدمة:</strong> الموقع الإلكتروني وأي خدمات رقمية ذات صلة.</li>
                        <li><strong>خدمة وسائل التواصل الاجتماعي التابعة لطرف ثالث:</strong> أي خدمة أو محتوى خارجي قد يتم دمجه أو عرضه ضمن الموقع.</li>
                        <li><strong>أنت:</strong> الفرد الذي يصل إلى الخدمة أو الكيان القانوني الذي يمثله هذا الفرد.</li>
                    </ul>
                </section>

                <section>
                    <h2>الإقرار</h2>
                    <p>
                        تشكل هذه الشروط الاتفاقية بينك وبين الشركة بخصوص استخدامك للخدمة. يخضع وصولك إلى الخدمة واستخدامك لها لقبولك والامتثال لهذه الشروط. إذا كنت لا توافق على أي جزء، فيجب عليك التوقف عن استخدام الخدمة.
                    </p>
                    <p>
                        يجب أن يكون عمرك <strong>أكثر من 18 عامًا</strong> لاستخدام الخدمة. لا تسمح الشركة باستخدام الخدمة لمن تقل أعمارهم عن 18 عامًا،<strong> باستثناء الأطفال الذين تتراوح أعمارهم بين 6-16 عامًا، الذين يمكنهم استخدام الخدمة بموافقة صريحة من الوالدين أو الوصي القانوني.</strong>
                    </p>
                    <p>
                        يخضع استخدامك للخدمة أيضًا <strong> لسياسة الخصوصية </strong> الخاصة بنا، والتي توضح ممارساتنا المتعلقة بجمع البيانات واستخدامها وأمانها.
                    </p>
                </section>

                <section>
                    <h2>حقوق الملكية الفكرية</h2>
                    <p>
                        باستثناء المحتوى الذي تملكه، تمتلك تريس إيدتك و/أو الجهات المرخصة لها جميع حقوق الملكية الفكرية والمواد الموجودة على هذا الموقع. يتم منحك <strong> ترخيصًا محدودًا </strong>فقط لأغراض عرض المواد الموجودة على هذا الموقع.
                    </p>
                </section>

                <section>
                    <h2>القيود</h2>
                    <ul>
                        <li>نشر أي مادة من الموقع في أي وسيلة إعلامية أخرى بدون إذن.</li>
                        <li>بيع أو ترخيص أو استغلال أي مواد من الموقع تجاريًا.</li>
                        <li>الأداء العام أو عرض أي محتوى من الموقع دون موافقة.</li>
                        <li>استخدام الموقع بطريقة قد تضر بتوافره أو أدائه.</li>
                        <li>الانخراط في أي أنشطة استخراج البيانات أو التنقيب عن البيانات المتعلقة بالموقع.</li>
                        <li>استخدام الموقع لأي غرض غير قانوني أو احتيالي.</li>
                    </ul>
                    <p>قد يتم تقييد الوصول إلى بعض مناطق هذا الموقع، وتحتفظ الشركة بالحق في فرض مزيد من القيود في أي وقت وفقًا لتقديرها الخاص.</p>
                </section>

                <section>
                    <h2>محتواك</h2>
                    <p>
                        أي محتوى تقوم بعرضه على الموقع ("محتواك") يجب أن يكون أصليًا ولا ينتهك حقوق أي طرف ثالث. من خلال عرض محتواك، تمنح الشركة <strong>ترخيصًا غير حصري، عالميًا، غير قابل للإلغاء، وقابلًا للترخيص الفرعي </strong>لاستخدامه وإعادة إنتاجه ونشره وتوزيعه عبر أي وسائط.
                    </p>
                    <p>تحتفظ الشركة بالحق في إزالة أي من محتواك دون إشعار.</p>
                </section>

                <section>
                    <h2>الروابط إلى مواقع أخرى</h2>
                    <p>
                        قد تحتوي خدمتنا على روابط لمواقع أو خدمات تابعة لأطراف ثالثة لا تمتلكها أو تتحكم فيها الشركة. لا تتحمل الشركة أي مسؤولية عن المحتوى أو سياسات الخصوصية أو ممارسات أي مواقع أو خدمات تابعة لأطراف ثالثة.
                    </p>
                </section>

                <section>
                    <h2>إنهاء الاستخدام</h2>
                    <p>
                        تحتفظ الشركة بالحق في <strong>إنهاء أو تعليق وصولك </strong>فورًا، دون إشعار، لأي انتهاك لهذه الشروط. عند الإنهاء، يتوقف حقك في استخدام الخدمة فورًا.
                    </p>
                </section>

                <section>
                    <h2>تحديد المسؤولية</h2>
                    <p>
                        إلى أقصى حد يسمح به القانون، لا تتحمل الشركة أو الشركات التابعة لها المسؤولية عن:
                    </p>
                    <ul>
                        <li>أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية تنشأ عن استخدامك للخدمة.</li>
                        <li>أي فقدان للبيانات أو الإيرادات أو انقطاع الأعمال نتيجة لاستخدام الخدمة أو عدم القدرة على استخدامها.</li>
                    </ul>
                    <p>
                        إذا كانت أي ولاية قضائية لا تسمح ببعض القيود، فستقتصر المسؤولية على <strong>أقصى حد يسمح به القانون.</strong>
                    </p>
                </section>

                <section>
                    <h2>إخلاء المسؤولية</h2>
                    <p>
                        يتم تقديم الخدمة <strong>"كما هي" و"كما هو متاح" </strong>دون أي ضمان من أي نوع. لا تقدم الشركة أي ضمانات بأن الخدمة:
                    </p>
                    <ul>
                        <li>ستكون خالية من الأخطاء أو غير منقطعة.</li>
                        <li>ستلبي متطلباتك الخاصة.</li>
                        <li>ستكون خالية من الفيروسات أو البرمجيات الضارة.</li>
                    </ul>
                    <p>
                        قد لا تسمح بعض السلطات القضائية باستثناء بعض الضمانات، لذا قد لا تنطبق عليك بعض القيود.
                    </p>
                </section>

                <section>
                    <h2>القانون الحاكم وتسوية النزاعات</h2>
                    <p>
                        تخضع هذه الشروط <strong>لقوانين مصر، </strong>مع استبعاد أحكام تنازع القوانين. يتم تسوية أي نزاعات تنشأ عن هذه الشروط أمام المحاكم المصرية.
                    </p>
                    <p>
                        بالنسبة<strong> لمستهلكي الاتحاد الأوروبي،</strong> تنطبق الحماية القانونية الإلزامية بموجب قوانين بلد إقامتك.
                    </p>
                </section>

                <section>
                    <h2>قابلية الفصل</h2>
                    <p>
                        إذا تم اعتبار أي بند من هذه الشروط غير قابل للتنفيذ، فسيتم تعديله أو إزالته دون التأثير على صلاحية البنود المتبقية.
                    </p>
                </section>

                <section>
                    <h2>التعديلات على هذه الشروط</h2>
                    <p>
                        نحتفظ بالحق في تعديل أو استبدال هذه الشروط في أي وقت. إذا كان التغيير جوهريًا، سنقدم إشعارًا لمدة 30 يومًا على الأقل قبل دخول التعديلات حيز التنفيذ.
                    </p>
                    <p>
                        من خلال الاستمرار في استخدام الخدمة بعد سريان التعديلات، فإنك توافق على الالتزام بالشروط المعدلة.
                    </p>
                </section>

                <section>
                    <h2>اتصل بنا</h2>
                    <p>
                        إذا كان لديك أي استفسارات حول هذه الشروط، يمكنك الاتصال بنا:
                        <br />
                        <strong>عبر البريد الإلكتروني:</strong> <a href="mailto:Info@traceedtech.com">Info@traceedtech.com</a>
                    </p>
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