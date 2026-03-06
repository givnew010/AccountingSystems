import{r as u,x as N,n as G,c,a as t,s as m,v as w,y as j,F as $,j as C,t as l,b as v,g as y,p as H,o as p,z as K}from"./DvWuZWfc.js";import{r as X,a as Z,b as tt}from"./BBrnFwqb.js";import{r as et}from"./CpExrxfR.js";import{r as st}from"./DXkGHkKS.js";import{r as ot}from"./CEyO1Y02.js";const rt={class:"min-h-screen bg-gray-100"},at={class:"flex flex-col lg:flex-row h-screen"},nt={class:"w-full lg:w-2/5 bg-gray-50 p-4 border-l border-gray-200"},lt={class:"bg-white rounded-lg shadow-sm"},it={class:"p-4 border-b border-gray-200"},dt={class:"mb-4"},ut={class:"mb-4"},ct={class:"overflow-x-auto"},pt={class:"w-full"},gt={class:"bg-white divide-y divide-gray-200"},mt=["onClick"],bt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},xt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},vt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},yt={class:"px-4 py-3 whitespace-nowrap"},ft={class:"px-4 py-3 border-t border-gray-200 flex justify-between items-center"},ht=["disabled"],wt={class:"text-sm text-gray-700"},_t=["disabled"],It={class:"w-full lg:w-3/5 bg-white p-6 shadow-md"},kt={class:"flex flex-wrap gap-2 mb-6"},$t=["disabled"],Ct=["disabled"],St=["disabled"],Ft=["disabled"],Nt={class:"grid grid-cols-2 gap-4"},jt={class:"grid grid-cols-2 gap-4"},Dt=["value"],Rt=["value"],Pt={class:"border border-gray-200 rounded-lg"},Qt={class:"overflow-x-auto"},Tt={class:"w-full"},Vt={class:"bg-white divide-y divide-gray-200"},Mt={class:"px-4 py-3"},Ut={class:"text-sm text-gray-900"},Et={class:"text-xs text-gray-500"},Lt={class:"px-4 py-3"},At=["onUpdate:modelValue","onInput","max"],qt={class:"text-xs text-gray-500 mt-1"},zt={class:"px-4 py-3 text-sm"},Ot={class:"px-4 py-3 text-sm font-medium"},Bt={class:"px-4 py-3"},Jt=["onClick"],Wt={class:"bg-gray-50 p-4 rounded-lg"},Yt={class:"flex justify-between items-center"},Gt={class:"text-lg font-bold text-gray-900"},Ht=10,oe={__name:"sales-return",setup(Kt){const S=u([{id:1,name:"أحمد محمد",balance:0},{id:2,name:"فاطمة علي",balance:0},{id:3,name:"محمد أحمد",balance:0}]),D=u([{id:1,name:"منتج 1",price:10,costPrice:8,stock:100},{id:2,name:"منتج 2",price:25.5,costPrice:20,stock:50},{id:3,name:"منتج 3",price:15.75,costPrice:12,stock:75}]),_=u([{id:1,number:"INV-001",date:"2024-01-15",customerId:1,customer:{name:"أحمد محمد"},paymentMethod:"cash",items:[{productId:1,product:{name:"منتج 1"},unit:"piece",quantity:2,price:10,discount:0,total:20}],total:20,status:"posted"}]),g=u([{id:1,number:"RTN-001",date:"2024-01-16",customerId:1,customer:{name:"أحمد محمد"},referenceInvoiceId:1,reason:"عيب في المنتج",items:[{productId:1,product:{name:"منتج 1"},unit:"piece",originalQuantity:2,returnQuantity:1,price:10,total:10}],total:10,status:"draft"}]),f=u(""),I=u("all"),b=u(1),r=u(null),n=u({number:"",date:new Date().toISOString().split("T")[0],customerId:"",referenceInvoiceId:"",reason:"",items:[],total:0,status:"draft"}),R=N(()=>{let o=g.value;return f.value&&(o=o.filter(e=>e.number.toLowerCase().includes(f.value.toLowerCase())||e.customer?.name.toLowerCase().includes(f.value.toLowerCase()))),I.value!=="all"&&(o=o.filter(e=>e.status===I.value)),o}),F=N(()=>Math.ceil(R.value.length/Ht)),P=N(()=>n.value.items.reduce((o,e)=>o+e.total,0)),T=o=>({draft:"مسودة",posted:"مُرحّلة"})[o]||o,V=o=>{r.value=o,n.value={...o,items:o.items.map(e=>({...e}))}},h=()=>{r.value=null;const o=`RTN-${String(g.value.length+1).padStart(3,"0")}`;n.value={number:o,date:new Date().toISOString().split("T")[0],customerId:"",referenceInvoiceId:"",reason:"",items:[],total:0,status:"draft"}},M=()=>{},U=()=>{if(r.value&&r.value.status!=="posted"&&confirm("هل أنت متأكد من حذف هذا المرتجع؟")){const o=g.value.findIndex(e=>e.id===r.value.id);o>-1&&(g.value.splice(o,1),r.value=null,h())}},E=()=>{if(!r.value||r.value.status==="posted")return;const o=r.value,e=o.total;o.items.forEach(d=>{const x=D.value.find(k=>k.id==d.productId);x&&(x.stock+=d.returnQuantity)});const a={id:Date.now(),date:new Date().toISOString().split("T")[0],reference:`مرتجع مبيعات ${o.number}`,description:`ترحيل مرتجع مبيعات ${o.number} للعميل ${o.customer.name}`,entries:[]};a.entries.push({accountId:1,accountName:"المبيعات",debit:0,credit:e});const i=o.items.reduce((d,x)=>{const k=D.value.find(Y=>Y.id==x.productId);return d+(k?k.costPrice*x.returnQuantity:0)},0);i>0&&(a.entries.push({accountId:5,accountName:"تكلفة المبيعات",debit:0,credit:i}),a.entries.push({accountId:3,accountName:"المخزون",debit:i,credit:0}));const Q=_.value.find(d=>d.id==o.referenceInvoiceId);if(Q)if(Q.paymentMethod==="cash")a.entries.push({accountId:2,accountName:"الصندوق",debit:0,credit:e});else{a.entries.push({accountId:4,accountName:"حسابات العملاء",debit:0,credit:e});const d=S.value.find(x=>x.id==o.customerId);d&&(d.balance=(d.balance||0)-e)}console.log("Journal Entry Created:",a),o.status="posted",o.postedDate=new Date().toISOString().split("T")[0],alert(`تم ترحيل المرتجع بنجاح!

المبلغ المُرجع: ${e.toFixed(2)} ريال`)},L=()=>{if(!r.value)return;const o=`
    <div class="print-invoice">
      <div class="print-header">
        <h1 style="font-size: 24px; margin: 0; color: #dc2626;">مرتجع مبيعات</h1>
        <div class="print-company-info">
          <h2 style="margin: 5px 0; color: #374151;">شركة المحاسبة والمخزون</h2>
          <p style="margin: 2px 0; color: #6b7280;">الرياض، المملكة العربية السعودية</p>
          <p style="margin: 2px 0; color: #6b7280;">هاتف: +966 11 234 5678 | بريد إلكتروني: info@company.com</p>
        </div>
      </div>

      <div class="print-invoice-details">
        <div class="print-customer-info">
          <h3 style="margin-bottom: 10px; color: #374151;">معلومات العميل</h3>
          <p style="margin: 2px 0;"><strong>الاسم:</strong> ${r.value.customerName}</p>
          <p style="margin: 2px 0;"><strong>العنوان:</strong> ${r.value.customerAddress||"غير محدد"}</p>
          <p style="margin: 2px 0;"><strong>الهاتف:</strong> ${r.value.customerPhone||"غير محدد"}</p>
        </div>
        <div class="print-invoice-info">
          <h3 style="margin-bottom: 10px; color: #374151;">تفاصيل المرتجع</h3>
          <p style="margin: 2px 0;"><strong>رقم المرتجع:</strong> ${r.value.number}</p>
          <p style="margin: 2px 0;"><strong>التاريخ:</strong> ${new Date(r.value.date).toLocaleDateString("ar-SA")}</p>
          <p style="margin: 2px 0;"><strong>رقم الفاتورة المرجعية:</strong> ${r.value.referenceInvoiceNumber}</p>
          <p style="margin: 2px 0;"><strong>طريقة الدفع:</strong> ${r.value.paymentMethod==="cash"?"نقدي":r.value.paymentMethod==="credit"?"آجل":"تحويل"}</p>
          <p style="margin: 2px 0;"><strong>الحالة:</strong> ${r.value.status==="draft"?"مسودة":r.value.status==="posted"?"مُرحّلة":"مدفوعة"}</p>
        </div>
      </div>

      <table class="print-table">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>الوحدة</th>
            <th>الكمية المُرجعة</th>
            <th>السعر</th>
            <th>الخصم</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          ${r.value.items.map(a=>`
            <tr>
              <td>${a.productName}</td>
              <td>${a.unit}</td>
              <td>${a.quantity}</td>
              <td>${a.price.toFixed(2)} ريال</td>
              <td>${a.discount.toFixed(2)} ريال</td>
              <td>${a.total.toFixed(2)} ريال</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="print-totals">
        <div class="print-total-row">
          <span><strong>المجموع الفرعي:</strong></span>
          <span>${r.value.subtotal.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row">
          <span><strong>إجمالي الخصم:</strong></span>
          <span>${r.value.totalDiscount.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row">
          <span><strong>الضريبة (15%):</strong></span>
          <span>${r.value.tax.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row" style="border-top: 2px solid #000; padding-top: 10px; margin-top: 10px;">
          <span><strong>إجمالي المبلغ المُرجع:</strong></span>
          <span style="font-size: 18px; font-weight: bold; color: #dc2626;">${r.value.total.toFixed(2)} ريال</span>
        </div>
      </div>

      ${r.value.notes?`
        <div style="margin-top: 30px;">
          <h4 style="margin-bottom: 10px; color: #374151;"><strong>ملاحظات:</strong></h4>
          <p style="color: #6b7280;">${r.value.notes}</p>
        </div>
      `:""}

      <div class="print-footer">
        <p>تم إصدار هذا المرتجع إلكترونياً في ${new Date().toLocaleString("ar-SA")}</p>
        <p style="color: #dc2626; font-weight: bold;">هذا مرتجع مبيعات - سيتم إعادة المبلغ أو تعديل الفاتورة الأصلية</p>
      </div>
    </div>
  `,e=window.open("","_blank","width=800,height=600");if(!e){alert("يرجى السماح بفتح النوافذ المنبثقة لطباعة المرتجع");return}const s=`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>مرتجع مبيعات - ${r.value.number}</title>
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
  `;e.document.write(s),e.document.close()},A=()=>{const o=_.value.find(e=>e.id==n.value.referenceInvoiceId);o?(n.value.customerId=o.customerId,n.value.items=o.items.map(e=>({productId:e.productId,product:e.product,unit:e.unit,originalQuantity:e.quantity,returnQuantity:0,price:e.price,total:0}))):(n.value.customerId="",n.value.items=[])},q=o=>{const e=n.value.items[o];e.total=e.returnQuantity*e.price},z=o=>{n.value.items.splice(o,1)},O=()=>{const o=P.value,e=S.value.find(a=>a.id==n.value.customerId),s=_.value.find(a=>a.id==n.value.referenceInvoiceId);if(r.value){const a=g.value.findIndex(i=>i.id===r.value.id);a>-1&&(g.value[a]={...n.value,id:r.value.id,total:o,customer:e,referenceInvoice:s})}else{const a=Math.max(...g.value.map(i=>i.id))+1;g.value.push({...n.value,id:a,total:o,customer:e,referenceInvoice:s})}h()},B=()=>{h()},J=()=>{b.value>1&&b.value--},W=()=>{b.value<F.value&&b.value++};return G(()=>{h()}),(o,e)=>(p(),c("div",rt,[t("div",at,[t("div",nt,[t("div",lt,[t("div",it,[e[8]||(e[8]=t("h2",{class:"text-lg font-semibold text-gray-900 mb-4"},"مرتجعات المبيعات",-1)),t("div",dt,[m(t("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>f.value=s),type:"text",placeholder:"البحث في المرتجعات...",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[w,f.value]])]),t("div",ut,[m(t("select",{"onUpdate:modelValue":e[1]||(e[1]=s=>I.value=s),class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[...e[7]||(e[7]=[t("option",{value:"all"},"جميع الحالات",-1),t("option",{value:"draft"},"مسودة",-1),t("option",{value:"posted"},"مُرحّلة",-1)])],512),[[j,I.value]])])]),t("div",ct,[t("table",pt,[e[9]||(e[9]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," رقم المرتجع "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," العميل "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المبلغ "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الحالة ")])],-1)),t("tbody",gt,[(p(!0),c($,null,C(R.value,s=>(p(),c("tr",{key:s.id,onClick:a=>V(s),class:"cursor-pointer hover:bg-gray-50"},[t("td",bt,l(s.number),1),t("td",xt,l(s.customer?.name||"غير محدد"),1),t("td",vt,l(s.total.toFixed(2))+" ريال ",1),t("td",yt,[t("span",{class:K(["inline-flex px-2 py-1 text-xs font-semibold rounded-full",s.status==="posted"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"])},l(T(s.status)),3)])],8,mt))),128))])])]),t("div",ft,[t("button",{onClick:J,disabled:b.value===1,class:"px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"}," السابق ",8,ht),t("span",wt," صفحة "+l(b.value)+" من "+l(F.value),1),t("button",{onClick:W,disabled:b.value===F.value,class:"px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"}," التالي ",8,_t)])])]),t("div",It,[t("div",kt,[t("button",{onClick:h,class:"flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700"},[v(y(X),{class:"w-5 h-5"})]),t("button",{onClick:M,disabled:!r.value,class:"flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"},[v(y(Z),{class:"w-5 h-5"})],8,$t),t("button",{onClick:U,disabled:!r.value||r.value.status==="posted",class:"flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"},[v(y(tt),{class:"w-5 h-5"})],8,Ct),t("button",{onClick:E,disabled:!r.value||r.value.status==="posted",class:"flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"},[v(y(et),{class:"w-5 h-5"})],8,St),t("button",{onClick:L,disabled:!r.value,class:"flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"},[v(y(st),{class:"w-5 h-5"})],8,Ft)]),t("form",{onSubmit:H(O,["prevent"]),class:"space-y-4"},[t("div",Nt,[t("div",null,[e[10]||(e[10]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"رقم المرتجع",-1)),m(t("input",{"onUpdate:modelValue":e[2]||(e[2]=s=>n.value.number=s),type:"text",readonly:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"},null,512),[[w,n.value.number]])]),t("div",null,[e[11]||(e[11]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"التاريخ",-1)),m(t("input",{"onUpdate:modelValue":e[3]||(e[3]=s=>n.value.date=s),type:"date",required:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[w,n.value.date]])])]),t("div",jt,[t("div",null,[e[13]||(e[13]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"العميل",-1)),m(t("select",{"onUpdate:modelValue":e[4]||(e[4]=s=>n.value.customerId=s),required:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[e[12]||(e[12]=t("option",{value:""},"اختر العميل",-1)),(p(!0),c($,null,C(S.value,s=>(p(),c("option",{key:s.id,value:s.id},l(s.name),9,Dt))),128))],512),[[j,n.value.customerId]])]),t("div",null,[e[15]||(e[15]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"فاتورة المبيعات المرجعية",-1)),m(t("select",{"onUpdate:modelValue":e[5]||(e[5]=s=>n.value.referenceInvoiceId=s),onChange:A,class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[e[14]||(e[14]=t("option",{value:""},"اختر فاتورة المبيعات",-1)),(p(!0),c($,null,C(_.value,s=>(p(),c("option",{key:s.id,value:s.id},l(s.number)+" - "+l(s.customer?.name)+" ("+l(s.total.toFixed(2))+" ريال) ",9,Rt))),128))],544),[[j,n.value.referenceInvoiceId]])])]),t("div",null,[e[16]||(e[16]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"سبب المرتجع",-1)),m(t("textarea",{"onUpdate:modelValue":e[6]||(e[6]=s=>n.value.reason=s),rows:"3",placeholder:"وصف سبب إرجاع المنتجات...",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[w,n.value.reason]])]),t("div",Pt,[e[18]||(e[18]=t("div",{class:"p-4 border-b border-gray-200"},[t("h3",{class:"text-lg font-medium text-gray-900"},"المنتجات المُرجعة")],-1)),t("div",Qt,[t("table",Tt,[e[17]||(e[17]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المنتج "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الكمية المُرجعة "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," السعر "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الإجمالي "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," إجراءات ")])],-1)),t("tbody",Vt,[(p(!0),c($,null,C(n.value.items,(s,a)=>(p(),c("tr",{key:a},[t("td",Mt,[t("div",Ut,l(s.product?.name),1),t("div",Et,l(s.unit),1)]),t("td",Lt,[m(t("input",{"onUpdate:modelValue":i=>s.returnQuantity=i,onInput:i=>q(a),type:"number",min:"0",max:s.originalQuantity,step:"0.01",class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},null,40,At),[[w,s.returnQuantity,void 0,{number:!0}]]),t("div",qt," من أصل: "+l(s.originalQuantity),1)]),t("td",zt,l(s.price.toFixed(2)),1),t("td",Ot,l(s.total.toFixed(2)),1),t("td",Bt,[t("button",{onClick:i=>z(a),class:"text-red-600 hover:text-red-800"},[v(y(ot),{class:"w-4 h-4"})],8,Jt)])]))),128))])])])]),t("div",Wt,[t("div",Yt,[e[19]||(e[19]=t("span",{class:"text-lg font-medium text-gray-900"},"إجمالي المرتجع:",-1)),t("span",Gt,l(P.value.toFixed(2))+" ريال",1)])]),t("div",{class:"flex gap-2 pt-4"},[e[20]||(e[20]=t("button",{type:"submit",class:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"}," حفظ ",-1)),t("button",{type:"button",onClick:B,class:"px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"}," إلغاء ")])],32)])])]))}};export{oe as default};
