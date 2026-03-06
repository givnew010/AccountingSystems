import{r as m,x as b,n as K,c as d,a as t,s as u,v as x,y,F as _,j as k,t as l,q as j,b as v,g as f,p as X,A as Z,z as N,o as p}from"./DvWuZWfc.js";import{r as tt,a as et,b as L}from"./BBrnFwqb.js";import{r as st}from"./CpExrxfR.js";import{r as ot}from"./DXkGHkKS.js";const at={class:"min-h-screen bg-gray-100"},lt={class:"flex flex-col lg:flex-row h-screen"},nt={class:"w-full lg:w-2/5 bg-gray-50 p-4 border-l border-gray-200"},rt={class:"bg-white rounded-lg shadow-sm"},it={class:"p-4 border-b border-gray-200"},dt={class:"mb-4"},ut={class:"mb-4"},pt={class:"overflow-x-auto"},ct={class:"w-full"},mt={class:"bg-white divide-y divide-gray-200"},gt=["onClick"],xt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},bt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},yt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},vt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},ft={class:"px-4 py-3 whitespace-nowrap"},ht={class:"px-4 py-3 border-t border-gray-200 flex justify-between items-center"},wt=["disabled"],_t={class:"text-sm text-gray-700"},kt=["disabled"],It={class:"w-full lg:w-3/5 bg-white p-6 shadow-md"},$t={class:"flex flex-wrap gap-2 mb-6"},Ft=["disabled"],Tt=["disabled"],Ct=["disabled"],St=["disabled"],Dt={class:"grid grid-cols-2 gap-4"},Vt=["value"],Ut={class:"grid grid-cols-2 gap-4"},Mt={class:"border border-gray-200 rounded-lg"},Pt={class:"overflow-x-auto"},qt={class:"w-full"},jt={class:"bg-white divide-y divide-gray-200"},Nt={class:"px-4 py-3"},Lt=["onUpdate:modelValue","onChange"],At=["value"],zt={class:"px-4 py-3"},Bt=["onUpdate:modelValue"],Ot={class:"px-4 py-3"},Et=["onUpdate:modelValue","onInput"],Qt={class:"px-4 py-3"},Rt=["onUpdate:modelValue","onInput"],Wt={class:"px-4 py-3"},Yt=["onUpdate:modelValue","onInput"],Gt={class:"px-4 py-3 text-sm text-gray-900"},Ht={class:"px-4 py-3"},Jt=["onClick"],Kt={class:"bg-gray-50 p-4 rounded-lg"},Xt={class:"grid grid-cols-2 gap-4 text-sm"},Zt={class:"font-medium"},te={class:"font-medium"},ee={class:"font-medium"},se={class:"font-bold text-lg text-blue-600"},oe={key:0,class:"bg-gray-50 rounded-lg p-6"},ae={class:"grid grid-cols-2 gap-6 mb-6"},le={class:"mt-1 text-sm text-gray-900"},ne={class:"mt-1 text-sm text-gray-900"},re={class:"mt-1 text-sm text-gray-900"},ie={class:"mt-1 text-sm text-gray-900"},de={class:"mt-1 text-sm text-gray-900"},ue={class:"border border-gray-200 rounded-lg mb-6"},pe={class:"overflow-x-auto"},ce={class:"w-full"},me={class:"bg-white divide-y divide-gray-200"},ge={class:"px-4 py-3 text-sm text-gray-900"},xe={class:"px-4 py-3 text-sm text-gray-900"},be={class:"px-4 py-3 text-sm text-gray-900"},ye={class:"px-4 py-3 text-sm text-gray-900"},ve={class:"px-4 py-3 text-sm text-gray-900"},fe={class:"px-4 py-3 text-sm text-gray-900"},he={class:"bg-blue-50 p-4 rounded-lg"},we={class:"grid grid-cols-2 gap-4 text-sm"},_e={class:"font-medium"},ke={class:"font-medium"},Ie={class:"font-medium"},$e={class:"font-bold text-lg text-blue-600"},Fe={key:0,class:"mt-4"},Te={class:"mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded"},Ce=10,Pe={__name:"purchases",setup(Se){const V=m([{id:1,name:"شركة الأدوات المكتبية",phone:"0112345678",email:"office@tools-sa.com",address:"الرياض، المملكة العربية السعودية",openingBalance:2500,balanceType:"credit",paymentTerms:"30days",status:"active"},{id:2,name:"مؤسسة الإلكترونيات المتقدمة",phone:"0123456789",email:"sales@electronics-sa.com",address:"جدة، المملكة العربية السعودية",openingBalance:1500,balanceType:"debit",paymentTerms:"15days",status:"active"}]),T=m([{id:1,name:"قلم حبر",category:"أدوات مكتبية",barcode:"123456789",status:"active",units:[{name:"قطعة",type:"base",conversionRate:1,salePrice:5,purchasePrice:3,costPrice:2,currentQuantity:100}]},{id:2,name:"ورق A4",category:"أدوات مكتبية",barcode:"987654321",status:"active",units:[{name:"رزمة",type:"base",conversionRate:1,salePrice:25,purchasePrice:18,costPrice:15,currentQuantity:50}]}]),c=m([{id:1,number:"PUR-2024-001",date:"2024-01-15",supplierId:1,supplier:{name:"شركة الأدوات المكتبية"},paymentMethod:"credit",paymentTerms:"30days",status:"posted",postedDate:"2024-01-15",items:[{productId:1,productName:"قلم حبر",unit:"قطعة",quantity:50,price:3,discount:0,total:150},{productId:2,productName:"ورق A4",unit:"رزمة",quantity:10,price:18,discount:0,total:180}],subtotal:330,totalDiscount:0,tax:49.5,total:379.5,notes:"طلبية شهرية"}]),h=m(""),I=m("all"),g=m(1),o=m(null),n=m({number:"",date:new Date().toISOString().split("T")[0],supplierId:"",paymentMethod:"credit",paymentTerms:"30days",notes:"",items:[]}),U=b(()=>{let a=c.value;return h.value&&(a=a.filter(e=>e.number.toLowerCase().includes(h.value.toLowerCase())||e.supplier?.name.toLowerCase().includes(h.value.toLowerCase()))),I.value!=="all"&&(a=a.filter(e=>e.status===I.value)),a}),C=b(()=>Math.ceil(U.value.length/Ce)),$=b(()=>n.value.items.reduce((a,e)=>a+e.total,0)),S=b(()=>n.value.items.reduce((a,e)=>a+e.discount,0)),D=b(()=>$.value*.15),M=b(()=>$.value-S.value+D.value),A=a=>{o.value=a,n.value={number:"",date:new Date().toISOString().split("T")[0],supplierId:"",paymentMethod:"credit",paymentTerms:"30days",notes:"",items:[]}},w=()=>{o.value=null,n.value={number:`PUR-2024-${String(c.value.length+1).padStart(3,"0")}`,date:new Date().toISOString().split("T")[0],supplierId:"",paymentMethod:"credit",paymentTerms:"30days",notes:"",items:[]}},z=()=>{o.value&&(n.value={number:o.value.number,date:o.value.date,supplierId:o.value.supplierId,paymentMethod:o.value.paymentMethod,paymentTerms:o.value.paymentTerms,notes:o.value.notes,items:[...o.value.items]})},B=()=>{if(!(!o.value||o.value.status==="posted")&&confirm("هل أنت متأكد من حذف هذه الفاتورة؟")){const a=c.value.findIndex(e=>e.id===o.value.id);a>-1&&(c.value.splice(a,1),o.value=null,w())}},O=()=>{!o.value||o.value.status==="posted"||(o.value.status="posted",o.value.postedDate=new Date().toISOString().split("T")[0],o.value.items.forEach(a=>{const e=T.value.find(s=>s.id==a.productId);if(e){const s=e.units.find(r=>r.name===a.unit);s&&(s.currentQuantity+=a.quantity)}}),alert(`تم ترحيل الفاتورة بنجاح!

المبلغ: ${o.value.total.toFixed(2)} ريال
تم تحديث المخزون`))},E=()=>{if(!o.value)return;const a=`
    <div class="print-invoice">
      <div class="print-header">
        <h1 style="font-size: 24px; margin: 0; color: #2563eb;">فاتورة مشتريات</h1>
        <div class="print-company-info">
          <h2 style="margin: 5px 0; color: #374151;">شركة المحاسبة والمخزون</h2>
          <p style="margin: 2px 0; color: #6b7280;">الرياض، المملكة العربية السعودية</p>
          <p style="margin: 2px 0; color: #6b7280;">هاتف: +966 11 234 5678 | بريد إلكتروني: info@company.com</p>
        </div>
      </div>

      <div class="print-invoice-details">
        <div class="print-supplier-info">
          <h3 style="margin-bottom: 10px; color: #374151;">معلومات المورد</h3>
          <p style="margin: 2px 0;"><strong>الاسم:</strong> ${o.value.supplier?.name}</p>
          <p style="margin: 2px 0;"><strong>العنوان:</strong> غير محدد</p>
          <p style="margin: 2px 0;"><strong>الهاتف:</strong> غير محدد</p>
        </div>
        <div class="print-invoice-info">
          <h3 style="margin-bottom: 10px; color: #374151;">تفاصيل الفاتورة</h3>
          <p style="margin: 2px 0;"><strong>رقم الفاتورة:</strong> ${o.value.number}</p>
          <p style="margin: 2px 0;"><strong>التاريخ:</strong> ${new Date(o.value.date).toLocaleDateString("ar-SA")}</p>
          <p style="margin: 2px 0;"><strong>طريقة الدفع:</strong> ${o.value.paymentMethod==="cash"?"نقدي":o.value.paymentMethod==="credit"?"آجل":"تحويل"}</p>
          <p style="margin: 2px 0;"><strong>شروط الدفع:</strong> ${q(o.value.paymentTerms)}</p>
          <p style="margin: 2px 0;"><strong>الحالة:</strong> ${o.value.status==="draft"?"مسودة":o.value.status==="posted"?"مُرحّلة":"مدفوعة"}</p>
        </div>
      </div>

      <table class="print-table">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>الوحدة</th>
            <th>الكمية</th>
            <th>السعر</th>
            <th>الخصم</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          ${o.value.items.map(r=>`
            <tr>
              <td>${r.productName}</td>
              <td>${r.unit}</td>
              <td>${r.quantity}</td>
              <td>${r.price.toFixed(2)} ريال</td>
              <td>${r.discount.toFixed(2)} ريال</td>
              <td>${r.total.toFixed(2)} ريال</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="print-totals">
        <div class="print-total-row">
          <span><strong>المجموع الفرعي:</strong></span>
          <span>${o.value.subtotal.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row">
          <span><strong>إجمالي الخصم:</strong></span>
          <span>${o.value.totalDiscount.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row">
          <span><strong>الضريبة (15%):</strong></span>
          <span>${o.value.tax.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row" style="border-top: 2px solid #000; padding-top: 10px; margin-top: 10px;">
          <span><strong>الإجمالي النهائي:</strong></span>
          <span style="font-size: 18px; font-weight: bold;">${o.value.total.toFixed(2)} ريال</span>
        </div>
      </div>

      ${o.value.notes?`
        <div style="margin-top: 30px;">
          <h4 style="margin-bottom: 10px; color: #374151;"><strong>ملاحظات:</strong></h4>
          <p style="color: #6b7280;">${o.value.notes}</p>
        </div>
      `:""}

      <div class="print-footer">
        <p>شكراً لتعاملكم معنا</p>
        <p>تم إصدار هذه الفاتورة إلكترونياً في ${new Date().toLocaleString("ar-SA")}</p>
      </div>
    </div>
  `,e=window.open("","_blank","width=800,height=600");if(!e){alert("يرجى السماح بفتح النوافذ المنبثقة لطباعة الفاتورة");return}const s=`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>فاتورة مشتريات - ${o.value.number}</title>
      <style>
        @media print {
          .no-print {
            display: none !important;
          }

          .print-invoice {
            font-family: 'Noto Sans Arabic', 'Inter', sans-serif;
            direction: rtl;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
            color: black;
          }

          .print-header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }

          .print-company-info {
            margin-bottom: 20px;
          }

          .print-invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }

          .print-supplier-info,
          .print-invoice-info {
            flex: 1;
          }

          .print-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }

          .print-table th,
          .print-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: right;
          }

          .print-table th {
            background: #f5f5f5;
            font-weight: bold;
          }

          .print-totals {
            text-align: left;
            margin-top: 20px;
          }

          .print-total-row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }

          .print-footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        }

        body {
          font-family: 'Noto Sans Arabic', 'Inter', sans-serif;
          margin: 0;
          padding: 20px;
          background: white;
        }
      </style>
    </head>
    <body>
      ${a}
      <script>
        window.onload = function() {
          window.print();
          setTimeout(function() {
            window.close();
          }, 1000);
        }
      <\/script>
    </body>
    </html>
  `;e.document.write(s),e.document.close()},Q=()=>{const a=V.value.find(s=>s.id==n.value.supplierId);if(!a)return;const e={...n.value,supplier:a,subtotal:$.value,totalDiscount:S.value,tax:D.value,total:M.value,status:"draft"};if(o.value){const s=c.value.findIndex(r=>r.id===o.value.id);s>-1&&(c.value[s]={...e,id:o.value.id})}else{const s=Math.max(...c.value.map(r=>r.id))+1;c.value.push({...e,id:s})}w()},R=()=>{w()},W=()=>{n.value.items.push({productId:"",unit:"قطعة",quantity:1,price:0,discount:0,total:0})},Y=a=>{n.value.items.splice(a,1)},G=a=>{const e=n.value.items[a],s=T.value.find(r=>r.id==e.productId);if(s){const r=s.units.find(i=>i.name===e.unit);r&&(e.price=r.purchasePrice,F(a))}},F=a=>{const e=n.value.items[a];e.total=e.quantity*e.price-e.discount},P=a=>({draft:"مسودة",posted:"مُرحّلة",paid:"مدفوعة"})[a]||a,q=a=>({immediate:"فوري","7days":"7 أيام","15days":"15 يوم","30days":"30 يوم","60days":"60 يوم"})[a]||a,H=()=>{g.value>1&&g.value--},J=()=>{g.value<C.value&&g.value++};return K(()=>{w()}),(a,e)=>(p(),d("div",at,[t("div",lt,[t("div",nt,[t("div",rt,[t("div",it,[e[9]||(e[9]=t("h2",{class:"text-lg font-semibold text-gray-900 mb-4"},"فواتير المشتريات",-1)),t("div",dt,[u(t("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>h.value=s),type:"text",placeholder:"البحث في الفواتير...",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[x,h.value]])]),t("div",ut,[u(t("select",{"onUpdate:modelValue":e[1]||(e[1]=s=>I.value=s),class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[...e[8]||(e[8]=[t("option",{value:"all"},"جميع الحالات",-1),t("option",{value:"draft"},"مسودة",-1),t("option",{value:"posted"},"مُرحّلة",-1),t("option",{value:"paid"},"مدفوعة",-1)])],512),[[y,I.value]])])]),t("div",pt,[t("table",ct,[e[10]||(e[10]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," رقم الفاتورة "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المورد "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المبلغ "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," تاريخ الترحيل "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الحالة ")])],-1)),t("tbody",mt,[(p(!0),d(_,null,k(U.value,s=>(p(),d("tr",{key:s.id,onClick:r=>A(s),class:"cursor-pointer hover:bg-gray-50"},[t("td",xt,l(s.number),1),t("td",bt,l(s.supplier?.name||"غير محدد"),1),t("td",yt,l(s.total.toFixed(2))+" ريال ",1),t("td",vt,l(s.postedDate||"-"),1),t("td",ft,[t("span",{class:N(["inline-flex px-2 py-1 text-xs font-semibold rounded-full",s.status==="posted"?"bg-green-100 text-green-800":s.status==="paid"?"bg-blue-100 text-blue-800":"bg-yellow-100 text-yellow-800"])},l(P(s.status)),3)])],8,gt))),128))])])]),t("div",ht,[t("button",{onClick:H,disabled:g.value===1,class:"px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"}," السابق ",8,wt),t("span",_t," صفحة "+l(g.value)+" من "+l(C.value),1),t("button",{onClick:J,disabled:g.value===C.value,class:"px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"}," التالي ",8,kt)])])]),t("div",It,[t("div",$t,[t("button",{onClick:w,class:"flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700"},[v(f(tt),{class:"w-5 h-5"})]),t("button",{onClick:z,disabled:!o.value,class:"flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"},[v(f(et),{class:"w-5 h-5"})],8,Ft),t("button",{onClick:B,disabled:!o.value||o.value.status==="posted",class:"flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"},[v(f(L),{class:"w-5 h-5"})],8,Tt),t("button",{onClick:O,disabled:!o.value||o.value.status==="posted",class:"flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"},[v(f(st),{class:"w-5 h-5"})],8,Ct),t("button",{onClick:E,disabled:!o.value,class:"flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"},[v(f(ot),{class:"w-5 h-5"})],8,St)]),t("form",{onSubmit:X(Q,["prevent"]),class:"space-y-4"},[t("div",Dt,[t("div",null,[e[11]||(e[11]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"رقم الفاتورة",-1)),u(t("input",{"onUpdate:modelValue":e[2]||(e[2]=s=>n.value.number=s),type:"text",readonly:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"},null,512),[[x,n.value.number]])]),t("div",null,[e[12]||(e[12]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"تاريخ الفاتورة",-1)),u(t("input",{"onUpdate:modelValue":e[3]||(e[3]=s=>n.value.date=s),type:"date",required:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[x,n.value.date]])])]),t("div",null,[e[14]||(e[14]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"المورد",-1)),u(t("select",{"onUpdate:modelValue":e[4]||(e[4]=s=>n.value.supplierId=s),required:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[e[13]||(e[13]=t("option",{value:""},"اختر المورد",-1)),(p(!0),d(_,null,k(V.value,s=>(p(),d("option",{key:s.id,value:s.id},l(s.name),9,Vt))),128))],512),[[y,n.value.supplierId]])]),t("div",Ut,[t("div",null,[e[16]||(e[16]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"طريقة الدفع",-1)),u(t("select",{"onUpdate:modelValue":e[5]||(e[5]=s=>n.value.paymentMethod=s),required:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[...e[15]||(e[15]=[t("option",{value:"cash"},"نقدي",-1),t("option",{value:"credit"},"آجل",-1),t("option",{value:"transfer"},"تحويل",-1)])],512),[[y,n.value.paymentMethod]])]),t("div",null,[e[18]||(e[18]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"شروط الدفع",-1)),u(t("select",{"onUpdate:modelValue":e[6]||(e[6]=s=>n.value.paymentTerms=s),class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[...e[17]||(e[17]=[Z('<option value="immediate">فوري</option><option value="7days">7 أيام</option><option value="15days">15 يوم</option><option value="30days">30 يوم</option><option value="60days">60 يوم</option>',5)])],512),[[y,n.value.paymentTerms]])])]),t("div",null,[e[19]||(e[19]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"ملاحظات",-1)),u(t("textarea",{"onUpdate:modelValue":e[7]||(e[7]=s=>n.value.notes=s),rows:"3",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",placeholder:"أدخل ملاحظات إضافية..."},null,512),[[x,n.value.notes]])]),t("div",Mt,[t("div",{class:"p-4 border-b border-gray-200"},[t("div",{class:"flex justify-between items-center"},[e[20]||(e[20]=t("h3",{class:"text-lg font-medium text-gray-900"},"المنتجات",-1)),t("button",{type:"button",onClick:W,class:"px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"}," إضافة منتج ")])]),t("div",Pt,[t("table",qt,[e[23]||(e[23]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المنتج "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الوحدة "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الكمية "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," السعر "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الخصم "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الإجمالي "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الإجراءات ")])],-1)),t("tbody",jt,[(p(!0),d(_,null,k(n.value.items,(s,r)=>(p(),d("tr",{key:r},[t("td",Nt,[u(t("select",{"onUpdate:modelValue":i=>s.productId=i,onChange:i=>G(r),class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},[e[21]||(e[21]=t("option",{value:""},"اختر المنتج",-1)),(p(!0),d(_,null,k(T.value,i=>(p(),d("option",{key:i.id,value:i.id},l(i.name),9,At))),128))],40,Lt),[[y,s.productId]])]),t("td",zt,[u(t("select",{"onUpdate:modelValue":i=>s.unit=i,class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},[...e[22]||(e[22]=[t("option",{value:"piece"},"قطعة",-1),t("option",{value:"box"},"صندوق",-1),t("option",{value:"kg"},"كيلو",-1),t("option",{value:"liter"},"لتر",-1)])],8,Bt),[[y,s.unit]])]),t("td",Ot,[u(t("input",{"onUpdate:modelValue":i=>s.quantity=i,onInput:i=>F(r),type:"number",min:"0",step:"0.01",class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},null,40,Et),[[x,s.quantity,void 0,{number:!0}]])]),t("td",Qt,[u(t("input",{"onUpdate:modelValue":i=>s.price=i,onInput:i=>F(r),type:"number",min:"0",step:"0.01",class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},null,40,Rt),[[x,s.price,void 0,{number:!0}]])]),t("td",Wt,[u(t("input",{"onUpdate:modelValue":i=>s.discount=i,onInput:i=>F(r),type:"number",min:"0",step:"0.01",class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},null,40,Yt),[[x,s.discount,void 0,{number:!0}]])]),t("td",Gt,l(s.total.toFixed(2))+" ريال ",1),t("td",Ht,[t("button",{type:"button",onClick:i=>Y(r),class:"text-red-600 hover:text-red-800"},[v(f(L),{class:"w-4 h-4"})],8,Jt)])]))),128))])])])]),t("div",Kt,[t("div",Xt,[t("div",null,[e[24]||(e[24]=t("label",{class:"block text-gray-700"},"المجموع الفرعي:",-1)),t("span",Zt,l($.value.toFixed(2))+" ريال",1)]),t("div",null,[e[25]||(e[25]=t("label",{class:"block text-gray-700"},"إجمالي الخصم:",-1)),t("span",te,l(S.value.toFixed(2))+" ريال",1)]),t("div",null,[e[26]||(e[26]=t("label",{class:"block text-gray-700"},"الضريبة (15%):",-1)),t("span",ee,l(D.value.toFixed(2))+" ريال",1)]),t("div",null,[e[27]||(e[27]=t("label",{class:"block text-gray-700 font-bold"},"الإجمالي النهائي:",-1)),t("span",se,l(M.value.toFixed(2))+" ريال",1)])])]),t("div",{class:"flex gap-2 pt-4"},[e[28]||(e[28]=t("button",{type:"submit",class:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"}," حفظ ",-1)),t("button",{type:"button",onClick:R,class:"px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"}," إلغاء ")])],32),o.value&&!n.value.number?(p(),d("div",oe,[e[42]||(e[42]=t("h3",{class:"text-lg font-medium text-gray-900 mb-4"},"تفاصيل الفاتورة",-1)),t("div",ae,[t("div",null,[e[29]||(e[29]=t("label",{class:"block text-sm font-medium text-gray-700"},"رقم الفاتورة",-1)),t("p",le,l(o.value.number),1)]),t("div",null,[e[30]||(e[30]=t("label",{class:"block text-sm font-medium text-gray-700"},"تاريخ الفاتورة",-1)),t("p",ne,l(new Date(o.value.date).toLocaleDateString("ar-SA")),1)]),t("div",null,[e[31]||(e[31]=t("label",{class:"block text-sm font-medium text-gray-700"},"المورد",-1)),t("p",re,l(o.value.supplier?.name),1)]),t("div",null,[e[32]||(e[32]=t("label",{class:"block text-sm font-medium text-gray-700"},"طريقة الدفع",-1)),t("p",ie,l(o.value.paymentMethod==="cash"?"نقدي":o.value.paymentMethod==="credit"?"آجل":"تحويل"),1)]),t("div",null,[e[33]||(e[33]=t("label",{class:"block text-sm font-medium text-gray-700"},"شروط الدفع",-1)),t("p",de,l(q(o.value.paymentTerms)),1)]),t("div",null,[e[34]||(e[34]=t("label",{class:"block text-sm font-medium text-gray-700"},"الحالة",-1)),t("span",{class:N(["inline-flex px-2 py-1 text-xs rounded-full mt-1",o.value.status==="posted"?"bg-green-100 text-green-800":o.value.status==="paid"?"bg-blue-100 text-blue-800":"bg-yellow-100 text-yellow-800"])},l(P(o.value.status)),3)])]),t("div",ue,[e[36]||(e[36]=t("div",{class:"p-4 border-b border-gray-200"},[t("h4",{class:"text-md font-medium text-gray-900"},"المنتجات")],-1)),t("div",pe,[t("table",ce,[e[35]||(e[35]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"المنتج"),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"الوحدة"),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"الكمية"),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"السعر"),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"الخصم"),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"الإجمالي")])],-1)),t("tbody",me,[(p(!0),d(_,null,k(o.value.items,s=>(p(),d("tr",{key:s.id},[t("td",ge,l(s.productName),1),t("td",xe,l(s.unit),1),t("td",be,l(s.quantity),1),t("td",ye,l(s.price.toFixed(2))+" ريال",1),t("td",ve,l(s.discount.toFixed(2))+" ريال",1),t("td",fe,l(s.total.toFixed(2))+" ريال",1)]))),128))])])])]),t("div",he,[t("div",we,[t("div",null,[e[37]||(e[37]=t("label",{class:"block text-gray-700"},"المجموع الفرعي:",-1)),t("span",_e,l(o.value.subtotal.toFixed(2))+" ريال",1)]),t("div",null,[e[38]||(e[38]=t("label",{class:"block text-gray-700"},"إجمالي الخصم:",-1)),t("span",ke,l(o.value.totalDiscount.toFixed(2))+" ريال",1)]),t("div",null,[e[39]||(e[39]=t("label",{class:"block text-gray-700"},"الضريبة (15%):",-1)),t("span",Ie,l(o.value.tax.toFixed(2))+" ريال",1)]),t("div",null,[e[40]||(e[40]=t("label",{class:"block text-gray-700 font-bold"},"الإجمالي النهائي:",-1)),t("span",$e,l(o.value.total.toFixed(2))+" ريال",1)])])]),o.value.notes?(p(),d("div",Fe,[e[41]||(e[41]=t("label",{class:"block text-sm font-medium text-gray-700"},"ملاحظات",-1)),t("p",Te,l(o.value.notes),1)])):j("",!0)])):j("",!0)])])]))}};export{Pe as default};
