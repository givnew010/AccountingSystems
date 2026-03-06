import{r as c,x as Q,n as K,c as i,a as t,s as m,v as _,y as R,F as I,j as k,t as a,q as V,b as v,g as f,p as X,z as L,o as d}from"./DvWuZWfc.js";import{r as Z,a as tt,b as et}from"./BBrnFwqb.js";import{r as st}from"./CpExrxfR.js";import{r as rt}from"./DXkGHkKS.js";import{r as ot}from"./CEyO1Y02.js";const at={class:"min-h-screen bg-gray-100"},nt={class:"flex flex-col lg:flex-row h-screen"},lt={class:"w-full lg:w-2/5 bg-gray-50 p-4 border-l border-gray-200"},it={class:"bg-white rounded-lg shadow-sm"},dt={class:"p-4 border-b border-gray-200"},ut={class:"mb-4"},pt={class:"mb-4"},ct={class:"overflow-x-auto"},gt={class:"w-full"},mt={class:"bg-white divide-y divide-gray-200"},xt=["onClick"],bt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},yt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},vt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},ft={class:"px-4 py-3 whitespace-nowrap"},ht={class:"px-4 py-3 border-t border-gray-200 flex justify-between items-center"},wt=["disabled"],_t={class:"text-sm text-gray-700"},It=["disabled"],kt={class:"w-full lg:w-3/5 bg-white p-6 shadow-md"},$t={class:"flex flex-wrap gap-2 mb-6"},Ct=["disabled"],St=["disabled"],Pt=["disabled"],Ft=["disabled"],Qt={class:"grid grid-cols-2 gap-4"},Rt={class:"grid grid-cols-2 gap-4"},Tt=["value"],jt=["value"],Dt={class:"border border-gray-200 rounded-lg"},Nt={class:"overflow-x-auto"},Ut={class:"w-full"},Vt={class:"bg-white divide-y divide-gray-200"},Lt={class:"px-4 py-3"},Et={class:"text-sm text-gray-900"},Mt={class:"text-xs text-gray-500"},At={class:"px-4 py-3"},qt=["onUpdate:modelValue","onInput","max"],zt={class:"text-xs text-gray-500 mt-1"},Bt={class:"px-4 py-3 text-sm"},Ot={class:"px-4 py-3 text-sm font-medium"},Jt={class:"px-4 py-3"},Wt=["onClick"],Yt={class:"bg-gray-50 p-4 rounded-lg"},Gt={class:"flex justify-between items-center"},Ht={class:"text-lg font-bold text-gray-900"},Kt={key:0,class:"bg-gray-50 rounded-lg p-6"},Xt={class:"grid grid-cols-2 gap-6 mb-6"},Zt={class:"mt-1 text-sm text-gray-900"},te={class:"mt-1 text-sm text-gray-900"},ee={class:"mt-1 text-sm text-gray-900"},se={class:"mt-1 text-sm text-gray-900"},re={class:"border border-gray-200 rounded-lg mb-6"},oe={class:"overflow-x-auto"},ae={class:"w-full"},ne={class:"bg-white divide-y divide-gray-200"},le={class:"px-4 py-3 text-sm text-gray-900"},ie={class:"px-4 py-3 text-sm text-gray-900"},de={class:"px-4 py-3 text-sm text-gray-900"},ue={class:"px-4 py-3 text-sm text-gray-900"},pe={class:"px-4 py-3 text-sm text-gray-900"},ce={class:"bg-red-50 p-4 rounded-lg"},ge={class:"flex justify-between items-center"},me={class:"text-lg font-bold text-red-600"},xe={key:0,class:"mt-4"},be={class:"mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded"},ye=10,ke={__name:"purchase-return",setup(ve){const S=c([{id:1,name:"شركة الأدوات المكتبية",phone:"0112345678",email:"office@tools-sa.com",address:"الرياض، المملكة العربية السعودية",openingBalance:2500,balanceType:"credit",paymentTerms:"30days",status:"active"},{id:2,name:"مؤسسة الإلكترونيات المتقدمة",phone:"0123456789",email:"sales@electronics-sa.com",address:"جدة، المملكة العربية السعودية",openingBalance:1500,balanceType:"debit",paymentTerms:"15days",status:"active"}]),T=c([{id:1,name:"قلم حبر",category:"أدوات مكتبية",barcode:"123456789",status:"active",units:[{name:"قطعة",type:"base",conversionRate:1,salePrice:5,purchasePrice:3,costPrice:2,currentQuantity:100}]},{id:2,name:"ورق A4",category:"أدوات مكتبية",barcode:"987654321",status:"active",units:[{name:"رزمة",type:"base",conversionRate:1,salePrice:25,purchasePrice:18,costPrice:15,currentQuantity:50}]}]),$=c([{id:1,number:"PUR-2024-001",date:"2024-01-15",supplierId:1,supplier:{name:"شركة الأدوات المكتبية"},paymentMethod:"credit",items:[{productId:1,product:{name:"قلم حبر"},unit:"قطعة",quantity:50,price:3,discount:0,total:150}],total:150,status:"posted"}]),g=c([{id:1,number:"PRTN-001",date:"2024-01-16",supplierId:1,supplier:{name:"شركة الأدوات المكتبية"},referenceInvoiceId:1,referenceInvoice:{number:"PUR-2024-001"},reason:"عيب في المنتج",items:[{productId:1,product:{name:"قلم حبر"},unit:"قطعة",originalQuantity:50,returnQuantity:10,price:3,total:30}],total:30,status:"draft"}]),h=c(""),C=c("all"),x=c(1),o=c(null),n=c({number:"",date:new Date().toISOString().split("T")[0],supplierId:"",referenceInvoiceId:"",reason:"",items:[],total:0,status:"draft"}),j=Q(()=>{let r=g.value;return h.value&&(r=r.filter(e=>e.number.toLowerCase().includes(h.value.toLowerCase())||e.supplier?.name.toLowerCase().includes(h.value.toLowerCase()))),C.value!=="all"&&(r=r.filter(e=>e.status===C.value)),r}),P=Q(()=>Math.ceil(j.value.length/ye)),D=Q(()=>n.value.items.reduce((r,e)=>r+e.total,0)),N=r=>({draft:"مسودة",posted:"مُرحّلة"})[r]||r,E=r=>{o.value=r,n.value={...r,items:r.items.map(e=>({...e}))}},w=()=>{o.value=null;const r=`PRTN-${String(g.value.length+1).padStart(3,"0")}`;n.value={number:r,date:new Date().toISOString().split("T")[0],supplierId:"",referenceInvoiceId:"",reason:"",items:[],total:0,status:"draft"}},M=()=>{},A=()=>{if(o.value&&o.value.status!=="posted"&&confirm("هل أنت متأكد من حذف هذا المرتجع؟")){const r=g.value.findIndex(e=>e.id===o.value.id);r>-1&&(g.value.splice(r,1),o.value=null,w())}},q=()=>{if(!o.value||o.value.status==="posted")return;const r=o.value,e=r.total;r.items.forEach(u=>{const b=T.value.find(y=>y.id==u.productId);if(b){const y=b.units.find(F=>F.name===u.unit);y&&(y.currentQuantity-=u.returnQuantity)}});const l={id:Date.now(),date:new Date().toISOString().split("T")[0],reference:`مرتجع مشتريات ${r.number}`,description:`ترحيل مرتجع مشتريات ${r.number} للمورد ${r.supplier.name}`,entries:[]};l.entries.push({accountId:6,accountName:"المشتريات",debit:0,credit:e});const p=r.items.reduce((u,b)=>{const y=T.value.find(F=>F.id==b.productId);return u+(y?y.costPrice*b.returnQuantity:0)},0);p>0&&l.entries.push({accountId:3,accountName:"المخزون",debit:0,credit:p});const U=$.value.find(u=>u.id==r.referenceInvoiceId);if(U)if(U.paymentMethod==="cash")l.entries.push({accountId:2,accountName:"الصندوق",debit:e,credit:0});else{l.entries.push({accountId:7,accountName:"حسابات الموردين",debit:e,credit:0});const u=S.value.find(b=>b.id==r.supplierId);u&&(u.balance=(u.balance||0)-e)}console.log("Journal Entry Created:",l),r.status="posted",r.postedDate=new Date().toISOString().split("T")[0],alert(`تم ترحيل المرتجع بنجاح!

المبلغ المُرجع: ${e.toFixed(2)} ريال
تم تعديل المخزون`)},z=()=>{if(!o.value)return;const r=`
    <div class="print-invoice">
      <div class="print-header">
        <h1 style="font-size: 24px; margin: 0; color: #dc2626;">مرتجع مشتريات</h1>
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
          <h3 style="margin-bottom: 10px; color: #374151;">تفاصيل المرتجع</h3>
          <p style="margin: 2px 0;"><strong>رقم المرتجع:</strong> ${o.value.number}</p>
          <p style="margin: 2px 0;"><strong>التاريخ:</strong> ${new Date(o.value.date).toLocaleDateString("ar-SA")}</p>
          <p style="margin: 2px 0;"><strong>رقم الفاتورة المرجعية:</strong> ${o.value.referenceInvoice?.number}</p>
          <p style="margin: 2px 0;"><strong>الحالة:</strong> ${o.value.status==="draft"?"مسودة":o.value.status==="posted"?"مُرحّلة":"مدفوعة"}</p>
        </div>
      </div>

      <table class="print-table">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>الوحدة</th>
            <th>الكمية المُرجعة</th>
            <th>السعر</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          ${o.value.items.map(l=>`
            <tr>
              <td>${l.productName}</td>
              <td>${l.unit}</td>
              <td>${l.returnQuantity}</td>
              <td>${l.price.toFixed(2)} ريال</td>
              <td>${l.total.toFixed(2)} ريال</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="print-totals">
        <div class="print-total-row" style="border-top: 2px solid #000; padding-top: 10px; margin-top: 10px;">
          <span><strong>إجمالي المبلغ المُرجع:</strong></span>
          <span style="font-size: 18px; font-weight: bold; color: #dc2626;">${o.value.total.toFixed(2)} ريال</span>
        </div>
      </div>

      ${o.value.reason?`
        <div style="margin-top: 30px;">
          <h4 style="margin-bottom: 10px; color: #374151;"><strong>سبب المرتجع:</strong></h4>
          <p style="color: #6b7280;">${o.value.reason}</p>
        </div>
      `:""}

      <div class="print-footer">
        <p>تم إصدار هذا المرتجع إلكترونياً في ${new Date().toLocaleString("ar-SA")}</p>
        <p style="color: #dc2626; font-weight: bold;">هذا مرتجع مشتريات - سيتم تعديل الفاتورة الأصلية أو إصدار ائتمان</p>
      </div>
    </div>
  `,e=window.open("","_blank","width=800,height=600");if(!e){alert("يرجى السماح بفتح النوافذ المنبثقة لطباعة المرتجع");return}const s=`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>مرتجع مشتريات - ${o.value.number}</title>
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
      ${r}
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
  `;e.document.write(s),e.document.close()},B=()=>{const r=$.value.find(e=>e.id==n.value.referenceInvoiceId);r?(n.value.supplierId=r.supplierId,n.value.items=r.items.map(e=>({productId:e.productId,product:e.product,unit:e.unit,originalQuantity:e.quantity,returnQuantity:0,price:e.price,total:0}))):(n.value.supplierId="",n.value.items=[])},O=r=>{const e=n.value.items[r];e.total=e.returnQuantity*e.price},J=r=>{n.value.items.splice(r,1)},W=()=>{const r=D.value,e=S.value.find(l=>l.id==n.value.supplierId),s=$.value.find(l=>l.id==n.value.referenceInvoiceId);if(o.value){const l=g.value.findIndex(p=>p.id===o.value.id);l>-1&&(g.value[l]={...n.value,id:o.value.id,total:r,supplier:e,referenceInvoice:s})}else{const l=Math.max(...g.value.map(p=>p.id))+1;g.value.push({...n.value,id:l,total:r,supplier:e,referenceInvoice:s})}w()},Y=()=>{w()},G=()=>{x.value>1&&x.value--},H=()=>{x.value<P.value&&x.value++};return K(()=>{w()}),(r,e)=>(d(),i("div",at,[t("div",nt,[t("div",lt,[t("div",it,[t("div",dt,[e[8]||(e[8]=t("h2",{class:"text-lg font-semibold text-gray-900 mb-4"},"مرتجعات المشتريات",-1)),t("div",ut,[m(t("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>h.value=s),type:"text",placeholder:"البحث في المرتجعات...",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[_,h.value]])]),t("div",pt,[m(t("select",{"onUpdate:modelValue":e[1]||(e[1]=s=>C.value=s),class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[...e[7]||(e[7]=[t("option",{value:"all"},"جميع الحالات",-1),t("option",{value:"draft"},"مسودة",-1),t("option",{value:"posted"},"مُرحّلة",-1)])],512),[[R,C.value]])])]),t("div",ct,[t("table",gt,[e[9]||(e[9]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," رقم المرتجع "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المورد "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المبلغ "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الحالة ")])],-1)),t("tbody",mt,[(d(!0),i(I,null,k(j.value,s=>(d(),i("tr",{key:s.id,onClick:l=>E(s),class:"cursor-pointer hover:bg-gray-50"},[t("td",bt,a(s.number),1),t("td",yt,a(s.supplier?.name||"غير محدد"),1),t("td",vt,a(s.total.toFixed(2))+" ريال ",1),t("td",ft,[t("span",{class:L(["inline-flex px-2 py-1 text-xs font-semibold rounded-full",s.status==="posted"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"])},a(N(s.status)),3)])],8,xt))),128))])])]),t("div",ht,[t("button",{onClick:G,disabled:x.value===1,class:"px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"}," السابق ",8,wt),t("span",_t," صفحة "+a(x.value)+" من "+a(P.value),1),t("button",{onClick:H,disabled:x.value===P.value,class:"px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"}," التالي ",8,It)])])]),t("div",kt,[t("div",$t,[t("button",{onClick:w,class:"flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700"},[v(f(Z),{class:"w-5 h-5"})]),t("button",{onClick:M,disabled:!o.value,class:"flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"},[v(f(tt),{class:"w-5 h-5"})],8,Ct),t("button",{onClick:A,disabled:!o.value||o.value.status==="posted",class:"flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"},[v(f(et),{class:"w-5 h-5"})],8,St),t("button",{onClick:q,disabled:!o.value||o.value.status==="posted",class:"flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"},[v(f(st),{class:"w-5 h-5"})],8,Pt),t("button",{onClick:z,disabled:!o.value,class:"flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"},[v(f(rt),{class:"w-5 h-5"})],8,Ft)]),t("form",{onSubmit:X(W,["prevent"]),class:"space-y-4"},[t("div",Qt,[t("div",null,[e[10]||(e[10]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"رقم المرتجع",-1)),m(t("input",{"onUpdate:modelValue":e[2]||(e[2]=s=>n.value.number=s),type:"text",readonly:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"},null,512),[[_,n.value.number]])]),t("div",null,[e[11]||(e[11]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"التاريخ",-1)),m(t("input",{"onUpdate:modelValue":e[3]||(e[3]=s=>n.value.date=s),type:"date",required:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[_,n.value.date]])])]),t("div",Rt,[t("div",null,[e[13]||(e[13]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"المورد",-1)),m(t("select",{"onUpdate:modelValue":e[4]||(e[4]=s=>n.value.supplierId=s),required:"",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[e[12]||(e[12]=t("option",{value:""},"اختر المورد",-1)),(d(!0),i(I,null,k(S.value,s=>(d(),i("option",{key:s.id,value:s.id},a(s.name),9,Tt))),128))],512),[[R,n.value.supplierId]])]),t("div",null,[e[15]||(e[15]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"فاتورة المشتريات المرجعية",-1)),m(t("select",{"onUpdate:modelValue":e[5]||(e[5]=s=>n.value.referenceInvoiceId=s),onChange:B,class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[e[14]||(e[14]=t("option",{value:""},"اختر فاتورة المشتريات",-1)),(d(!0),i(I,null,k($.value,s=>(d(),i("option",{key:s.id,value:s.id},a(s.number)+" - "+a(s.supplier?.name)+" ("+a(s.total.toFixed(2))+" ريال) ",9,jt))),128))],544),[[R,n.value.referenceInvoiceId]])])]),t("div",null,[e[16]||(e[16]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"سبب المرتجع",-1)),m(t("textarea",{"onUpdate:modelValue":e[6]||(e[6]=s=>n.value.reason=s),rows:"3",placeholder:"وصف سبب إرجاع المنتجات...",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[_,n.value.reason]])]),t("div",Dt,[e[18]||(e[18]=t("div",{class:"p-4 border-b border-gray-200"},[t("h3",{class:"text-lg font-medium text-gray-900"},"المنتجات المُرجعة")],-1)),t("div",Nt,[t("table",Ut,[e[17]||(e[17]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المنتج "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الكمية المُرجعة "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," السعر "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الإجمالي "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," إجراءات ")])],-1)),t("tbody",Vt,[(d(!0),i(I,null,k(n.value.items,(s,l)=>(d(),i("tr",{key:l},[t("td",Lt,[t("div",Et,a(s.product?.name),1),t("div",Mt,a(s.unit),1)]),t("td",At,[m(t("input",{"onUpdate:modelValue":p=>s.returnQuantity=p,onInput:p=>O(l),type:"number",min:"0",max:s.originalQuantity,step:"0.01",class:"w-full px-2 py-1 border border-gray-300 rounded text-sm"},null,40,qt),[[_,s.returnQuantity,void 0,{number:!0}]]),t("div",zt," من أصل: "+a(s.originalQuantity),1)]),t("td",Bt,a(s.price.toFixed(2)),1),t("td",Ot,a(s.total.toFixed(2)),1),t("td",Jt,[t("button",{onClick:p=>J(l),class:"text-red-600 hover:text-red-800"},[v(f(ot),{class:"w-4 h-4"})],8,Wt)])]))),128))])])])]),t("div",Yt,[t("div",Gt,[e[19]||(e[19]=t("span",{class:"text-lg font-medium text-gray-900"},"إجمالي المرتجع:",-1)),t("span",Ht,a(D.value.toFixed(2))+" ريال",1)])]),t("div",{class:"flex gap-2 pt-4"},[e[20]||(e[20]=t("button",{type:"submit",class:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"}," حفظ ",-1)),t("button",{type:"button",onClick:Y,class:"px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"}," إلغاء ")])],32),o.value&&!n.value.number?(d(),i("div",Kt,[e[30]||(e[30]=t("h3",{class:"text-lg font-medium text-gray-900 mb-4"},"تفاصيل المرتجع",-1)),t("div",Xt,[t("div",null,[e[21]||(e[21]=t("label",{class:"block text-sm font-medium text-gray-700"},"رقم المرتجع",-1)),t("p",Zt,a(o.value.number),1)]),t("div",null,[e[22]||(e[22]=t("label",{class:"block text-sm font-medium text-gray-700"},"تاريخ المرتجع",-1)),t("p",te,a(new Date(o.value.date).toLocaleDateString("ar-SA")),1)]),t("div",null,[e[23]||(e[23]=t("label",{class:"block text-sm font-medium text-gray-700"},"المورد",-1)),t("p",ee,a(o.value.supplier?.name),1)]),t("div",null,[e[24]||(e[24]=t("label",{class:"block text-sm font-medium text-gray-700"},"فاتورة المشتريات المرجعية",-1)),t("p",se,a(o.value.referenceInvoice?.number),1)]),t("div",null,[e[25]||(e[25]=t("label",{class:"block text-sm font-medium text-gray-700"},"الحالة",-1)),t("span",{class:L(["inline-flex px-2 py-1 text-xs rounded-full mt-1",o.value.status==="posted"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"])},a(N(o.value.status)),3)])]),t("div",re,[e[27]||(e[27]=t("div",{class:"p-4 border-b border-gray-200"},[t("h4",{class:"text-md font-medium text-gray-900"},"المنتجات المُرجعة")],-1)),t("div",oe,[t("table",ae,[e[26]||(e[26]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"المنتج"),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"الوحدة"),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"الكمية المُرجعة"),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"السعر"),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"الإجمالي")])],-1)),t("tbody",ne,[(d(!0),i(I,null,k(o.value.items,s=>(d(),i("tr",{key:s.id},[t("td",le,a(s.productName),1),t("td",ie,a(s.unit),1),t("td",de,a(s.returnQuantity),1),t("td",ue,a(s.price.toFixed(2))+" ريال",1),t("td",pe,a(s.total.toFixed(2))+" ريال",1)]))),128))])])])]),t("div",ce,[t("div",ge,[e[28]||(e[28]=t("span",{class:"text-lg font-medium text-gray-900"},"إجمالي المبلغ المُرجع:",-1)),t("span",me,a(o.value.total.toFixed(2))+" ريال",1)])]),o.value.reason?(d(),i("div",xe,[e[29]||(e[29]=t("label",{class:"block text-sm font-medium text-gray-700"},"سبب المرتجع",-1)),t("p",be,a(o.value.reason),1)])):V("",!0)])):V("",!0)])])]))}};export{ke as default};
