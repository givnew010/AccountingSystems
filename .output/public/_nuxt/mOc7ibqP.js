import{r as c,x as N,n as R,c as m,a as t,s as u,v as y,y as k,F as V,j as S,t as p,b as f,g as h,p as X,d as Z,o as g,z as tt}from"./DvWuZWfc.js";import{r as P,a as et,b as st}from"./BBrnFwqb.js";import{r as ot}from"./CpExrxfR.js";import{r as at}from"./DXkGHkKS.js";import{r as nt}from"./CEyO1Y02.js";const rt={class:"min-h-screen bg-gray-100"},lt={class:"flex flex-col lg:flex-row h-screen"},dt={class:"w-full lg:w-2/5 bg-gray-50 p-4 border-l border-gray-200"},it={class:"bg-white rounded-lg shadow-sm"},ut={class:"p-4 border-b border-gray-200"},pt={class:"mb-4"},ct={class:"mb-4"},mt={class:"overflow-x-auto"},gt={class:"w-full"},bt={class:"bg-white divide-y divide-gray-200"},xt=["onClick"],vt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},yt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},ft={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},ht={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},wt={class:"px-4 py-3 whitespace-nowrap"},_t={class:"px-4 py-3 border-t border-gray-200 flex justify-between items-center"},It=["disabled"],kt={class:"text-sm text-gray-700"},$t=["disabled"],Ct={class:"w-full lg:w-3/5 bg-white p-6 shadow-md"},Vt={class:"flex flex-wrap gap-2 mb-6"},St=["disabled"],Ut=["disabled"],Ft=["disabled"],Nt=["disabled"],jt={class:"grid grid-cols-2 gap-4"},Dt={class:"grid grid-cols-2 gap-4"},Mt=["value"],Pt={class:"border border-gray-200 rounded-lg"},qt={class:"overflow-x-auto"},Tt={class:"w-full"},Et={class:"bg-white divide-y divide-gray-200"},Lt={class:"px-4 py-3"},At=["onUpdate:modelValue","onChange"],zt=["value"],Ot={class:"px-4 py-3"},Bt=["onUpdate:modelValue"],Qt={class:"px-4 py-3"},Wt=["onUpdate:modelValue","onInput"],Yt={class:"px-4 py-3"},Gt=["onUpdate:modelValue","onInput"],Ht={class:"px-4 py-3"},Jt=["onUpdate:modelValue","onInput"],Kt={class:"px-4 py-3 text-sm font-medium"},Rt={class:"px-4 py-3"},Xt=["onClick"],Zt={class:"p-4 border-t border-gray-200"},te={class:"bg-gray-50 p-4 rounded-lg"},ee={class:"flex justify-between items-center"},se={class:"text-lg font-bold text-gray-900"},oe=10,ue={__name:"sales",setup(ae){const U=c([{id:1,name:"أحمد محمد"},{id:2,name:"فاطمة علي"},{id:3,name:"محمد أحمد"}]),w=c([{id:1,name:"منتج 1",price:10,costPrice:8,stock:100},{id:2,name:"منتج 2",price:25.5,costPrice:20,stock:50},{id:3,name:"منتج 3",price:15.75,costPrice:12,stock:75}]),j=c([]),q=c([{id:1,name:"المبيعات",type:"revenue",balance:0},{id:2,name:"الصندوق",type:"asset",balance:1e4},{id:3,name:"المخزون",type:"asset",balance:5e3},{id:4,name:"حسابات العملاء",type:"asset",balance:0},{id:5,name:"تكلفة المبيعات",type:"expense",balance:0}]),b=c([{id:1,number:"INV-001",date:"2024-01-15",customerId:1,customer:{name:"أحمد محمد"},paymentMethod:"cash",notes:"",items:[{productId:1,product:{name:"منتج 1"},unit:"piece",quantity:2,price:10,discount:0,total:20}],total:20,status:"draft"}]),_=c(""),$=c("all"),v=c(1),a=c(null),l=c({number:"",date:new Date().toISOString().split("T")[0],customerId:"",paymentMethod:"cash",notes:"",items:[],total:0,status:"draft"}),D=N(()=>{let o=b.value;return _.value&&(o=o.filter(e=>e.number.toLowerCase().includes(_.value.toLowerCase())||e.customer?.name.toLowerCase().includes(_.value.toLowerCase()))),$.value!=="all"&&(o=o.filter(e=>e.status===$.value)),o}),F=N(()=>Math.ceil(D.value.length/oe)),M=N(()=>l.value.items.reduce((o,e)=>o+e.total,0)),T=o=>({draft:"مسودة",posted:"مُرحّلة",paid:"مدفوعة"})[o]||o,E=o=>{a.value=o,l.value={...o,items:o.items.map(e=>({...e}))}},I=()=>{a.value=null;const o=`INV-${String(b.value.length+1).padStart(3,"0")}`;l.value={number:o,date:new Date().toISOString().split("T")[0],customerId:"",paymentMethod:"cash",notes:"",items:[],total:0,status:"draft"}},L=()=>{},A=()=>{if(a.value&&a.value.status!=="posted"&&confirm("هل أنت متأكد من حذف هذه الفاتورة؟")){const o=b.value.findIndex(e=>e.id===a.value.id);o>-1&&(b.value.splice(o,1),a.value=null,I())}},z=()=>{if(!a.value||a.value.status==="posted")return;for(const d of a.value.items){const i=w.value.find(x=>x.id==d.productId);if(!i){alert(`المنتج ${d.productId} غير موجود`);return}if(i.stock<d.quantity){alert(`الكمية المتاحة من ${i.name} غير كافية. المتاح: ${i.stock}`);return}}const o=a.value,e=o.total;o.items.forEach(d=>{const i=w.value.find(x=>x.id==d.productId);i&&(i.stock-=d.quantity)});const s=j.value.length+1,n={id:s,date:new Date().toISOString().split("T")[0],reference:`فاتورة مبيعات ${o.number}`,description:`ترحيل فاتورة مبيعات ${o.number} للعميل ${o.customer.name}`,entries:[]};n.entries.push({accountId:1,accountName:"المبيعات",debit:e,credit:0});const r=o.items.reduce((d,i)=>{const x=w.value.find(K=>K.id==i.productId);return d+(x?x.costPrice*i.quantity:0)},0);if(r>0&&(n.entries.push({accountId:5,accountName:"تكلفة المبيعات",debit:r,credit:0}),n.entries.push({accountId:3,accountName:"المخزون",debit:0,credit:r})),o.paymentMethod==="cash")n.entries.push({accountId:2,accountName:"الصندوق",debit:e,credit:0});else{n.entries.push({accountId:4,accountName:"حسابات العملاء",debit:e,credit:0});const d=U.value.find(i=>i.id==o.customerId);d&&(d.balance=(d.balance||0)+e)}j.value.push(n),n.entries.forEach(d=>{const i=q.value.find(x=>x.id===d.accountId);i&&(i.balance+=d.debit-d.credit)}),o.status="posted",o.postedDate=new Date().toISOString().split("T")[0],alert(`تم ترحيل الفاتورة بنجاح!

تفاصيل الترحيل:
- رقم القيد: ${s}
- المبلغ: ${e.toFixed(2)} ريال
- تم تحديث المخزون والحسابات`)},O=()=>{if(!a.value)return;const o=`
    <div class="print-invoice">
      <div class="print-header">
        <h1 style="font-size: 24px; margin: 0; color: #2563eb;">فاتورة مبيعات</h1>
        <div class="print-company-info">
          <h2 style="margin: 5px 0; color: #374151;">شركة المحاسبة والمخزون</h2>
          <p style="margin: 2px 0; color: #6b7280;">الرياض، المملكة العربية السعودية</p>
          <p style="margin: 2px 0; color: #6b7280;">هاتف: +966 11 234 5678 | بريد إلكتروني: info@company.com</p>
        </div>
      </div>

      <div class="print-invoice-details">
        <div class="print-customer-info">
          <h3 style="margin-bottom: 10px; color: #374151;">معلومات العميل</h3>
          <p style="margin: 2px 0;"><strong>الاسم:</strong> ${a.value.customerName}</p>
          <p style="margin: 2px 0;"><strong>العنوان:</strong> ${a.value.customerAddress||"غير محدد"}</p>
          <p style="margin: 2px 0;"><strong>الهاتف:</strong> ${a.value.customerPhone||"غير محدد"}</p>
        </div>
        <div class="print-invoice-info">
          <h3 style="margin-bottom: 10px; color: #374151;">تفاصيل الفاتورة</h3>
          <p style="margin: 2px 0;"><strong>رقم الفاتورة:</strong> ${a.value.number}</p>
          <p style="margin: 2px 0;"><strong>التاريخ:</strong> ${new Date(a.value.date).toLocaleDateString("ar-SA")}</p>
          <p style="margin: 2px 0;"><strong>طريقة الدفع:</strong> ${a.value.paymentMethod==="cash"?"نقدي":a.value.paymentMethod==="credit"?"آجل":"تحويل"}</p>
          <p style="margin: 2px 0;"><strong>الحالة:</strong> ${a.value.status==="draft"?"مسودة":a.value.status==="posted"?"مُرحّلة":"مدفوعة"}</p>
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
          ${a.value.items.map(n=>`
            <tr>
              <td>${n.productName}</td>
              <td>${n.unit}</td>
              <td>${n.quantity}</td>
              <td>${n.price.toFixed(2)} ريال</td>
              <td>${n.discount.toFixed(2)} ريال</td>
              <td>${n.total.toFixed(2)} ريال</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="print-totals">
        <div class="print-total-row">
          <span><strong>المجموع الفرعي:</strong></span>
          <span>${a.value.subtotal.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row">
          <span><strong>إجمالي الخصم:</strong></span>
          <span>${a.value.totalDiscount.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row">
          <span><strong>الضريبة (15%):</strong></span>
          <span>${a.value.tax.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row" style="border-top: 2px solid #000; padding-top: 10px; margin-top: 10px;">
          <span><strong>الإجمالي النهائي:</strong></span>
          <span style="font-size: 18px; font-weight: bold;">${a.value.total.toFixed(2)} ريال</span>
        </div>
      </div>

      ${a.value.notes?`
        <div style="margin-top: 30px;">
          <h4 style="margin-bottom: 10px; color: #374151;"><strong>ملاحظات:</strong></h4>
          <p style="color: #6b7280;">${a.value.notes}</p>
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
      <title>فاتورة مبيعات - ${a.value.number}</title>
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

          .print-customer-info,
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
      ${o}
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
  `;e.document.write(s),e.document.close()},B=()=>{l.value.items.push({productId:"",unit:"piece",quantity:1,price:0,discount:0,total:0})},Q=o=>{l.value.items.splice(o,1)},W=o=>{const e=l.value.items[o],s=w.value.find(n=>n.id==e.productId);s&&(e.price=s.price,C(o))},C=o=>{const e=l.value.items[o];e.total=e.quantity*e.price-e.discount},Y=()=>{const o=M.value,e=U.value.find(s=>s.id==l.value.customerId);if(a.value){const s=b.value.findIndex(n=>n.id===a.value.id);s>-1&&(b.value[s]={...l.value,id:a.value.id,total:o,customer:e})}else{const s=Math.max(...b.value.map(n=>n.id))+1;b.value.push({...l.value,id:s,total:o,customer:e})}I()},G=()=>{I()},H=()=>{v.value>1&&v.value--},J=()=>{v.value<F.value&&v.value++};return R(()=>{I()}),(o,e)=>(g(),m("div",rt,[t("div",lt,[t("div",dt,[t("div",it,[t("div",ut,[e[8]||(e[8]=t("h2",{class:"text-lg font-semibold text-gray-900 mb-4"},"فواتير المبيعات",-1)),t("div",pt,[u(t("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>_.value=s),type:"text",placeholder:"البحث في الفواتير...",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[y,_.value]])]),t("div",ct,[u(t("select",{"onUpdate:modelValue":e[1]||(e[1]=s=>$.value=s),class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[...e[7]||(e[7]=[t("option",{value:"all"},"جميع الحالات",-1),t("option",{value:"draft"},"مسودة",-1),t("option",{value:"posted"},"مُرحّلة",-1),t("option",{value:"paid"},"مدفوعة",-1)])],512),[[k,$.value]])])]),t("div",mt,[t("table",gt,[e[9]||(e[9]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," رقم الفاتورة "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," العميل "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المبلغ "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," تاريخ الترحيل "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الحالة ")])],-1)),t("tbody",bt,[(g(!0),m(V,null,S(D.value,s=>(g(),m("tr",{key:s.id,onClick:n=>E(s),class:"cursor-pointer hover:bg-gray-50"},[t("td",vt,p(s.number),1),t("td",yt,p(s.customer?.name||"غير محدد"),1),t("td",ft,p(s.total.toFixed(2))+" ريال ",1),t("td",ht,p(s.postedDate||"-"),1),t("td",wt,[t("span",{class:tt(["inline-flex px-2 py-1 text-xs font-semibold rounded-full",s.status==="posted"?"bg-green-100 text-green-800":s.status==="paid"?"bg-blue-100 text-blue-800":"bg-yellow-100 text-yellow-800"])},p(T(s.status)),3)])],8,xt))),128))])])]),t("div",_t,[t("button",{onClick:H,disabled:v.value===1,class:"px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"}," السابق ",8,It),t("span",kt," صفحة "+p(v.value)+" من "+p(F.value),1),t("button",{onClick:J,disabled:v.value===F.value,class:"px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"}," التالي ",8,$t)])])]),t("div",Ct,[t("div",Vt,[t("button",{onClick:I,class:"flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700"},[f(h(P),{class:"w-5 h-5"})]),t("button",{onClick:L,disabled:!a.value,class:"flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"},[f(h(et),{class:"w-5 h-5"})],8,St),t("button",{onClick:A,disabled:!a.value||a.value.status==="posted",class:"flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"},[f(h(st),{class:"w-5 h-5"})],8,Ut),t("button",{onClick:z,disabled:!a.value||a.value.status==="posted",class:"flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"},[f(h(ot),{class:"w-5 h-5"})],8,Ft),t("button",{onClick:O,disabled:!a.value,class:"flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"},[f(h(at),{class:"w-5 h-5"})],8,Nt)]),t("form",{onSubmit:X(Y,["prevent"]),class:"space-y-4"},[t("div",jt,[t("div",null,[e[10]||(e[10]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"رقم الفاتورة",-1)),u(t("input",{"onUpdate:modelValue":e[2]||(e[2]=s=>l.value.number=s),type:"text",readonly:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"},null,512),[[y,l.value.number]])]),t("div",null,[e[11]||(e[11]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"التاريخ",-1)),u(t("input",{"onUpdate:modelValue":e[3]||(e[3]=s=>l.value.date=s),type:"date",required:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[y,l.value.date]])])]),t("div",Dt,[t("div",null,[e[13]||(e[13]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"العميل",-1)),u(t("select",{"onUpdate:modelValue":e[4]||(e[4]=s=>l.value.customerId=s),required:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[e[12]||(e[12]=t("option",{value:""},"اختر العميل",-1)),(g(!0),m(V,null,S(U.value,s=>(g(),m("option",{key:s.id,value:s.id},p(s.name),9,Mt))),128))],512),[[k,l.value.customerId]])]),t("div",null,[e[15]||(e[15]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"طريقة الدفع",-1)),u(t("select",{"onUpdate:modelValue":e[5]||(e[5]=s=>l.value.paymentMethod=s),required:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[...e[14]||(e[14]=[t("option",{value:"cash"},"نقدي",-1),t("option",{value:"credit"},"آجل",-1),t("option",{value:"transfer"},"تحويل",-1)])],512),[[k,l.value.paymentMethod]])])]),t("div",null,[e[16]||(e[16]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"ملاحظات",-1)),u(t("textarea",{"onUpdate:modelValue":e[6]||(e[6]=s=>l.value.notes=s),rows:"3",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[y,l.value.notes]])]),t("div",Pt,[e[21]||(e[21]=t("div",{class:"p-4 border-b border-gray-200"},[t("h3",{class:"text-lg font-medium text-gray-900"},"المنتجات")],-1)),t("div",qt,[t("table",Tt,[e[19]||(e[19]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المنتج "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الوحدة "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الكمية "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," السعر "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الخصم "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الإجمالي "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," إجراءات ")])],-1)),t("tbody",Et,[(g(!0),m(V,null,S(l.value.items,(s,n)=>(g(),m("tr",{key:n},[t("td",Lt,[u(t("select",{"onUpdate:modelValue":r=>s.productId=r,onChange:r=>W(n),class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},[e[17]||(e[17]=t("option",{value:""},"اختر المنتج",-1)),(g(!0),m(V,null,S(w.value,r=>(g(),m("option",{key:r.id,value:r.id},p(r.name),9,zt))),128))],40,At),[[k,s.productId]])]),t("td",Ot,[u(t("select",{"onUpdate:modelValue":r=>s.unit=r,class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},[...e[18]||(e[18]=[t("option",{value:"piece"},"قطعة",-1),t("option",{value:"kg"},"كيلو",-1),t("option",{value:"box"},"صندوق",-1)])],8,Bt),[[k,s.unit]])]),t("td",Qt,[u(t("input",{"onUpdate:modelValue":r=>s.quantity=r,onInput:r=>C(n),type:"number",min:"0",step:"0.01",class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},null,40,Wt),[[y,s.quantity,void 0,{number:!0}]])]),t("td",Yt,[u(t("input",{"onUpdate:modelValue":r=>s.price=r,onInput:r=>C(n),type:"number",min:"0",step:"0.01",class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},null,40,Gt),[[y,s.price,void 0,{number:!0}]])]),t("td",Ht,[u(t("input",{"onUpdate:modelValue":r=>s.discount=r,onInput:r=>C(n),type:"number",min:"0",step:"0.01",class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},null,40,Jt),[[y,s.discount,void 0,{number:!0}]])]),t("td",Kt,p(s.total.toFixed(2)),1),t("td",Rt,[t("button",{onClick:r=>Q(n),class:"text-red-600 hover:text-red-800"},[f(h(nt),{class:"w-4 h-4"})],8,Xt)])]))),128))])])]),t("div",Zt,[t("button",{onClick:B,type:"button",class:"flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"},[f(h(P),{class:"w-4 h-4"}),e[20]||(e[20]=Z(" إضافة منتج ",-1))])])]),t("div",te,[t("div",ee,[e[22]||(e[22]=t("span",{class:"text-lg font-medium text-gray-900"},"الإجمالي:",-1)),t("span",se,p(M.value.toFixed(2))+" ريال",1)])]),t("div",{class:"flex gap-2 pt-4"},[e[23]||(e[23]=t("button",{type:"submit",class:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"}," حفظ ",-1)),t("button",{type:"button",onClick:G,class:"px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"}," إلغاء ")])],32)])])]))}};export{ue as default};
