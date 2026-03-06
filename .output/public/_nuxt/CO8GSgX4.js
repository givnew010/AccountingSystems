import{_ as G}from"./CgSPouwC.js";import{u as H,r as J,a as K,_ as X,b as Z,c as tt,d as et,e as st,f as ot,g as rt}from"./g5_JE8Nh.js";import{m as at,r as c,x as lt,n as nt,c as d,a as t,q as M,g as u,b as k,F as f,j as v,t as a,z as x,s as y,v as R,y as _,o as l,w as dt,k as it,l as ut,P as ct}from"./DvWuZWfc.js";import{u as pt}from"./BtXzdUNb.js";import{r as gt}from"./CEyO1Y02.js";import{r as V}from"./DZgxDJ_G.js";import{r as bt,a as P}from"./DN4rLeDs.js";import{r as mt}from"./C_f9M--r.js";import{r as xt}from"./CNSzf2CP.js";import{r as yt}from"./B0jM6DKV.js";const ht={class:"min-h-screen bg-gray-100"},ft={class:"md:hidden fixed top-4 right-4 z-50"},vt={class:"p-4 border-b border-gray-200 flex justify-between items-center"},wt={class:"flex-1 px-2 py-4"},kt={class:"space-y-2"},_t={class:"text-sm font-medium"},$t={class:"p-4 border-t border-gray-200"},It={class:"flex items-center mb-3"},St={class:"mr-3"},Dt={class:"text-sm font-medium text-gray-900"},Ct={class:"text-xs text-gray-500"},Mt={class:"flex flex-col lg:flex-row min-h-screen"},Qt={class:"flex-1 md:mr-64"},Rt={class:"bg-white shadow-sm border-b border-gray-200"},Vt={class:"px-4 sm:px-6 lg:px-8"},Pt={class:"-mb-px flex space-x-8 space-x-reverse","aria-label":"Tabs"},Ft={key:0,class:"p-4 sm:p-6 lg:p-8"},At={class:"bg-white rounded-lg shadow-sm"},Tt={class:"p-6 border-b border-gray-200"},Ut={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"},Lt=["value"],Et={class:"mt-4 flex flex-wrap gap-2"},Nt=["disabled"],zt=["disabled"],jt={key:0,class:"p-6"},Ot={class:"overflow-x-auto"},Bt={class:"w-full"},Wt={class:"bg-white divide-y divide-gray-200"},Yt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},qt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},Gt={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},Ht={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},Jt={class:"px-4 py-3 whitespace-nowrap"},Kt={class:"bg-gray-50"},Xt={class:"px-4 py-3 text-sm font-bold text-gray-900"},Zt={key:1,class:"p-6 text-center text-gray-500"},te={key:1,class:"p-4 sm:p-6 lg:p-8"},ee={class:"bg-white rounded-lg shadow-sm"},se={class:"p-6 border-b border-gray-200"},oe={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"},re=["value"],ae=["value"],le={class:"mt-4 flex flex-wrap gap-2"},ne=["disabled"],de=["disabled"],ie={key:0,class:"p-6"},ue={class:"overflow-x-auto"},ce={class:"w-full"},pe={class:"bg-white divide-y divide-gray-200"},ge={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},be={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},me={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},xe={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},ye={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},he={class:"px-4 py-3 whitespace-nowrap text-sm text-gray-900"},fe={class:"px-4 py-3 whitespace-nowrap"},ve={class:"bg-gray-50"},we={class:"px-4 py-3 text-sm font-bold text-gray-900"},ke={class:"px-4 py-3 text-sm font-bold text-gray-900"},_e={key:1,class:"p-6 text-center text-gray-500"},Ae={__name:"reports",setup($e){const g=H(),$=pt(),F=at(),A=c([{name:"dashboard",path:"/",label:"لوحة التحكم",icon:Z},{name:"customers",path:"/customers",label:"العملاء",icon:V},{name:"suppliers",path:"/suppliers",label:"الموردين",icon:tt},{name:"sales",path:"/sales",label:"المبيعات",icon:bt},{name:"sales-return",path:"/sales-return",label:"مرتجعات المبيعات",icon:P},{name:"purchases",path:"/purchases",label:"المشتريات",icon:et},{name:"purchase-return",path:"/purchase-return",label:"مرتجعات المشتريات",icon:P},{name:"products",path:"/products",label:"المنتجات",icon:mt},{name:"categories",path:"/categories",label:"الفئات",icon:xt},{name:"units",path:"/units",label:"وحدات القياس",icon:yt},{name:"reports",path:"/reports",label:"التقارير",icon:st},{name:"branches-warehouses",path:"/branches-warehouses",label:"الفروع والمستودعات",icon:ot},{name:"users",path:"/users",label:"المستخدمين",icon:V},{name:"settings",path:"#",label:"الإعدادات",icon:rt}]),h=c("sales"),n=c({startDate:"",endDate:"",customerId:"",status:"all"}),b=c([]),I=c({total:0}),i=c({categoryId:"",productId:"",stockStatus:"all"}),m=c([]),w=c({totalValue:0,totalItems:0}),T=c([{id:1,name:"أحمد محمد"},{id:2,name:"فاطمة علي"},{id:3,name:"محمد أحمد"}]),U=c([{id:1,name:"أدوات مكتبية"},{id:2,name:"إلكترونيات"},{id:3,name:"أثاث"}]),S=c([{id:1,name:"قلم حبر",categoryId:1,category:{name:"أدوات مكتبية"},units:[{name:"قطعة",purchasePrice:3,currentQuantity:100}]},{id:2,name:"ورق A4",categoryId:1,category:{name:"أدوات مكتبية"},units:[{name:"رزمة",purchasePrice:18,currentQuantity:50}]},{id:3,name:"كرسي مكتبي",categoryId:3,category:{name:"أثاث"},units:[{name:"قطعة",purchasePrice:150,currentQuantity:25}]}]),L=c([{id:1,number:"INV-2024-001",date:"2024-01-15",customerId:1,customer:{name:"أحمد محمد"},total:330,status:"posted"},{id:2,number:"INV-2024-002",date:"2024-01-20",customerId:2,customer:{name:"فاطمة علي"},total:180,status:"paid"},{id:3,number:"INV-2024-003",date:"2024-01-25",customerId:1,customer:{name:"أحمد محمد"},total:450,status:"posted"}]),E=lt(()=>i.value.categoryId?S.value.filter(o=>o.categoryId==i.value.categoryId):S.value),N=()=>{$.logout(),F.push("/login")},z=()=>{let o=L.value;n.value.startDate&&(o=o.filter(e=>e.date>=n.value.startDate)),n.value.endDate&&(o=o.filter(e=>e.date<=n.value.endDate)),n.value.customerId&&(o=o.filter(e=>e.customerId==n.value.customerId)),n.value.status!=="all"&&(o=o.filter(e=>e.status===n.value.status)),b.value=o,I.value.total=o.reduce((e,r)=>e+r.total,0)},j=()=>{let o=[];S.value.forEach(e=>{e.units.forEach(r=>{const p={id:`${e.id}-${r.name}`,product:e,unit:r,currentQuantity:r.currentQuantity,purchasePrice:r.purchasePrice};i.value.categoryId&&e.categoryId!=i.value.categoryId||i.value.productId&&e.id!=i.value.productId||i.value.stockStatus!=="all"&&D(p.currentQuantity)!==i.value.stockStatus||o.push(p)})}),m.value=o,w.value={totalValue:o.reduce((e,r)=>e+r.currentQuantity*r.purchasePrice,0),totalItems:o.length}},D=o=>o===0?"out-of-stock":o<10?"low-stock":"in-stock",C=o=>{const e=D(o);return{"in-stock":"متوفر","low-stock":"منخفض","out-of-stock":"نفد"}[e]||e},O=o=>{const e=D(o);return{"in-stock":"bg-green-100 text-green-800","low-stock":"bg-yellow-100 text-yellow-800","out-of-stock":"bg-red-100 text-red-800"}[e]||"bg-gray-100 text-gray-800"},B=()=>{if(!b.value.length)return;const o=`
    <div class="print-invoice">
      <div class="print-header">
        <h1 style="font-size: 24px; margin: 0; color: #2563eb;">تقرير المبيعات</h1>
        <div class="print-company-info">
          <h2 style="margin: 5px 0; color: #374151;">شركة المحاسبة والمخزون</h2>
          <p style="margin: 2px 0; color: #6b7280;">الرياض، المملكة العربية السعودية</p>
          <p style="margin: 2px 0; color: #6b7280;">هاتف: +966 11 234 5678 | بريد إلكتروني: info@company.com</p>
        </div>
        <div class="print-filters">
          <p style="margin: 2px 0;"><strong>الفترة:</strong> ${n.value.startDate||"غير محدد"} - ${n.value.endDate||"غير محدد"}</p>
          <p style="margin: 2px 0;"><strong>تاريخ التقرير:</strong> ${new Date().toLocaleString("ar-SA")}</p>
        </div>
      </div>

      <table class="print-table">
        <thead>
          <tr>
            <th>رقم الفاتورة</th>
            <th>التاريخ</th>
            <th>العميل</th>
            <th>المبلغ</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          ${b.value.map(e=>`
            <tr>
              <td>${e.number}</td>
              <td>${new Date(e.date).toLocaleDateString("ar-SA")}</td>
              <td>${e.customer?.name}</td>
              <td>${e.total.toFixed(2)} ريال</td>
              <td>${e.status==="posted"?"مُرحّلة":"مدفوعة"}</td>
            </tr>
          `).join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="text-align: right; font-weight: bold;">المجموع الكلي:</td>
            <td style="font-weight: bold;">${I.value.total.toFixed(2)} ريال</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;Q(o,"تقرير المبيعات")},W=()=>{if(!m.value.length)return;const o=`
    <div class="print-invoice">
      <div class="print-header">
        <h1 style="font-size: 24px; margin: 0; color: #2563eb;">تقرير المخزون</h1>
        <div class="print-company-info">
          <h2 style="margin: 5px 0; color: #374151;">شركة المحاسبة والمخزون</h2>
          <p style="margin: 2px 0; color: #6b7280;">الرياض، المملكة العربية السعودية</p>
          <p style="margin: 2px 0; color: #6b7280;">هاتف: +966 11 234 5678 | بريد إلكتروني: info@company.com</p>
        </div>
        <div class="print-filters">
          <p style="margin: 2px 0;"><strong>تاريخ التقرير:</strong> ${new Date().toLocaleString("ar-SA")}</p>
        </div>
      </div>

      <table class="print-table">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>الفئة</th>
            <th>الوحدة</th>
            <th>الكمية الحالية</th>
            <th>سعر الشراء</th>
            <th>القيمة الإجمالية</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          ${m.value.map(e=>`
            <tr>
              <td>${e.product.name}</td>
              <td>${e.product.category?.name||"غير مصنف"}</td>
              <td>${e.unit.name}</td>
              <td>${e.currentQuantity}</td>
              <td>${e.purchasePrice.toFixed(2)} ريال</td>
              <td>${(e.currentQuantity*e.purchasePrice).toFixed(2)} ريال</td>
              <td>${C(e.currentQuantity)}</td>
            </tr>
          `).join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" style="text-align: right; font-weight: bold;">إجمالي القيمة:</td>
            <td style="font-weight: bold;">${w.value.totalValue.toFixed(2)} ريال</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: right; font-weight: bold;">إجمالي المنتجات:</td>
            <td style="font-weight: bold;">${w.value.totalItems}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;Q(o,"تقرير المخزون")},Q=(o,e)=>{const r=window.open("","_blank","width=800,height=600");if(!r){alert("يرجى السماح بفتح النوافذ المنبثقة لطباعة التقرير");return}const p=`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${e}</title>
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
  `;r.document.write(p),r.document.close()},Y=()=>{if(!b.value.length)return;let o=`رقم الفاتورة,التاريخ,العميل,المبلغ,الحالة
`;b.value.forEach(s=>{o+=`${s.number},${new Date(s.date).toLocaleDateString("ar-SA")},${s.customer?.name},${s.total}, ${s.status==="posted"?"مُرحّلة":"مدفوعة"}
`});const e=new Blob([o],{type:"text/csv;charset=utf-8;"}),r=document.createElement("a"),p=URL.createObjectURL(e);r.setAttribute("href",p),r.setAttribute("download","تقرير_المبيعات.csv"),r.style.visibility="hidden",document.body.appendChild(r),r.click(),document.body.removeChild(r)},q=()=>{if(!m.value.length)return;let o=`المنتج,الفئة,الوحدة,الكمية الحالية,سعر الشراء,القيمة الإجمالية,الحالة
`;m.value.forEach(s=>{o+=`${s.product.name},${s.product.category?.name||"غير مصنف"},${s.unit.name},${s.currentQuantity},${s.purchasePrice},${s.currentQuantity*s.purchasePrice},${C(s.currentQuantity)}
`});const e=new Blob([o],{type:"text/csv;charset=utf-8;"}),r=document.createElement("a"),p=URL.createObjectURL(e);r.setAttribute("href",p),r.setAttribute("download","تقرير_المخزون.csv"),r.style.visibility="hidden",document.body.appendChild(r),r.click(),document.body.removeChild(r)};return nt(()=>{const o=new Date,e=new Date(o.getTime()-720*60*60*1e3);n.value.endDate=o.toISOString().split("T")[0],n.value.startDate=e.toISOString().split("T")[0]}),(o,e)=>{const r=G,p=X;return l(),d("div",ht,[t("div",ft,[t("button",{onClick:e[0]||(e[0]=(...s)=>u(g).toggleMobileMenu&&u(g).toggleMobileMenu(...s)),class:"bg-blue-600 text-white p-2 rounded-lg shadow-lg"},[k(u(J),{class:"w-6 h-6"})])]),u(g).isMobileMenuOpen?(l(),d("div",{key:0,onClick:e[1]||(e[1]=(...s)=>u(g).closeMobileMenu&&u(g).closeMobileMenu(...s)),class:"md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"})):M("",!0),t("div",{class:x(["md:hidden fixed top-0 right-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-transform duration-300","w-64",u(g).isMobileMenuOpen?"transform translate-x-0":"transform translate-x-full"])},[t("div",vt,[e[12]||(e[12]=t("h3",{class:"text-lg font-semibold text-gray-900"},"القائمة",-1)),t("button",{onClick:e[2]||(e[2]=(...s)=>u(g).closeMobileMenu&&u(g).closeMobileMenu(...s)),class:"p-2 rounded-lg hover:bg-gray-100"},[k(u(gt),{class:"w-6 h-6 text-gray-600"})])]),t("nav",wt,[t("ul",kt,[(l(!0),d(f,null,v(A.value,s=>(l(),d("li",{key:s.name},[k(r,{to:s.path,onClick:u(g).closeMobileMenu,class:x(["flex items-center px-3 py-2 rounded-lg transition-colors","hover:bg-blue-50 hover:text-blue-600",(o._.provides[ct]||o.$route).path===s.path?"bg-blue-50 text-blue-600":"text-gray-600"])},{default:dt(()=>[(l(),it(ut(s.icon),{class:"w-6 h-6 flex-shrink-0 ml-3"})),t("span",_t,a(s.label),1)]),_:2},1032,["to","onClick","class"])]))),128))])]),t("div",$t,[t("div",It,[e[13]||(e[13]=t("div",{class:"w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0"}," م ",-1)),t("div",St,[t("p",Dt,a(u($).user?.name),1),t("p",Ct,a(u($).user?.role),1)])]),t("button",{onClick:N,class:x(["w-full flex items-center px-3 py-2 rounded-lg transition-colors","hover:bg-red-50 hover:text-red-600 text-red-600"])},[k(u(K),{class:"w-5 h-5 flex-shrink-0 ml-2"}),e[14]||(e[14]=t("span",{class:"text-sm font-medium"},"تسجيل الخروج",-1))])])],2),t("div",Mt,[k(p,{class:"hidden md:block"}),t("div",Qt,[t("div",Rt,[t("div",Vt,[t("nav",Pt,[t("button",{onClick:e[3]||(e[3]=s=>h.value="sales"),class:x(["whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",h.value==="sales"?"border-blue-500 text-blue-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"])}," تقارير المبيعات ",2),t("button",{onClick:e[4]||(e[4]=s=>h.value="inventory"),class:x(["whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",h.value==="inventory"?"border-blue-500 text-blue-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"])}," تقارير المخزون ",2)])])]),h.value==="sales"?(l(),d("div",Ft,[t("div",At,[t("div",Tt,[e[21]||(e[21]=t("h2",{class:"text-lg font-semibold text-gray-900 mb-4"},"تقارير المبيعات",-1)),t("div",Ut,[t("div",null,[e[15]||(e[15]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"من تاريخ",-1)),y(t("input",{"onUpdate:modelValue":e[5]||(e[5]=s=>n.value.startDate=s),type:"date",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[R,n.value.startDate]])]),t("div",null,[e[16]||(e[16]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"إلى تاريخ",-1)),y(t("input",{"onUpdate:modelValue":e[6]||(e[6]=s=>n.value.endDate=s),type:"date",class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[R,n.value.endDate]])]),t("div",null,[e[18]||(e[18]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"العميل",-1)),y(t("select",{"onUpdate:modelValue":e[7]||(e[7]=s=>n.value.customerId=s),class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[e[17]||(e[17]=t("option",{value:""},"جميع العملاء",-1)),(l(!0),d(f,null,v(T.value,s=>(l(),d("option",{key:s.id,value:s.id},a(s.name),9,Lt))),128))],512),[[_,n.value.customerId]])]),t("div",null,[e[20]||(e[20]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"الحالة",-1)),y(t("select",{"onUpdate:modelValue":e[8]||(e[8]=s=>n.value.status=s),class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[...e[19]||(e[19]=[t("option",{value:"all"},"جميع الحالات",-1),t("option",{value:"posted"},"مُرحّلة",-1),t("option",{value:"paid"},"مدفوعة",-1)])],512),[[_,n.value.status]])])]),t("div",Et,[t("button",{onClick:z,class:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"}," إنشاء التقرير "),t("button",{onClick:B,disabled:!b.value.length,class:"px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"}," طباعة التقرير ",8,Nt),t("button",{onClick:Y,disabled:!b.value.length,class:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"}," تصدير إلى Excel ",8,zt)])]),b.value.length?(l(),d("div",jt,[t("div",Ot,[t("table",Bt,[e[24]||(e[24]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," رقم الفاتورة "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," التاريخ "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," العميل "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المبلغ "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الحالة ")])],-1)),t("tbody",Wt,[(l(!0),d(f,null,v(b.value,s=>(l(),d("tr",{key:s.id},[t("td",Yt,a(s.number),1),t("td",qt,a(new Date(s.date).toLocaleDateString("ar-SA")),1),t("td",Gt,a(s.customer?.name),1),t("td",Ht,a(s.total.toFixed(2))+" ريال ",1),t("td",Jt,[t("span",{class:x(["inline-flex px-2 py-1 text-xs font-semibold rounded-full",s.status==="posted"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800"])},a(s.status==="posted"?"مُرحّلة":"مدفوعة"),3)])]))),128))]),t("tfoot",Kt,[t("tr",null,[e[22]||(e[22]=t("td",{colspan:"3",class:"px-4 py-3 text-sm font-medium text-gray-900 text-right"}," المجموع الكلي: ",-1)),t("td",Xt,a(I.value.total.toFixed(2))+" ريال ",1),e[23]||(e[23]=t("td",null,null,-1))])])])])])):(l(),d("div",Zt," لا توجد بيانات للعرض. يرجى تعديل المرشحات وإنشاء التقرير. "))])])):M("",!0),h.value==="inventory"?(l(),d("div",te,[t("div",ee,[t("div",se,[e[31]||(e[31]=t("h2",{class:"text-lg font-semibold text-gray-900 mb-4"},"تقارير المخزون",-1)),t("div",oe,[t("div",null,[e[26]||(e[26]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"الفئة",-1)),y(t("select",{"onUpdate:modelValue":e[9]||(e[9]=s=>i.value.categoryId=s),class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[e[25]||(e[25]=t("option",{value:""},"جميع الفئات",-1)),(l(!0),d(f,null,v(U.value,s=>(l(),d("option",{key:s.id,value:s.id},a(s.name),9,re))),128))],512),[[_,i.value.categoryId]])]),t("div",null,[e[28]||(e[28]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"المنتج",-1)),y(t("select",{"onUpdate:modelValue":e[10]||(e[10]=s=>i.value.productId=s),class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[e[27]||(e[27]=t("option",{value:""},"جميع المنتجات",-1)),(l(!0),d(f,null,v(E.value,s=>(l(),d("option",{key:s.id,value:s.id},a(s.name),9,ae))),128))],512),[[_,i.value.productId]])]),t("div",null,[e[30]||(e[30]=t("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"حالة المخزون",-1)),y(t("select",{"onUpdate:modelValue":e[11]||(e[11]=s=>i.value.stockStatus=s),class:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[...e[29]||(e[29]=[t("option",{value:"all"},"جميع الحالات",-1),t("option",{value:"in-stock"},"متوفر",-1),t("option",{value:"low-stock"},"منخفض",-1),t("option",{value:"out-of-stock"},"نفد",-1)])],512),[[_,i.value.stockStatus]])])]),t("div",le,[t("button",{onClick:j,class:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"}," إنشاء التقرير "),t("button",{onClick:W,disabled:!m.value.length,class:"px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"}," طباعة التقرير ",8,ne),t("button",{onClick:q,disabled:!m.value.length,class:"px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"}," تصدير إلى Excel ",8,de)])]),m.value.length?(l(),d("div",ie,[t("div",ue,[t("table",ce,[e[36]||(e[36]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," المنتج "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الفئة "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الوحدة "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الكمية الحالية "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," سعر الشراء "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," القيمة الإجمالية "),t("th",{class:"px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"}," الحالة ")])],-1)),t("tbody",pe,[(l(!0),d(f,null,v(m.value,s=>(l(),d("tr",{key:s.id},[t("td",ge,a(s.product.name),1),t("td",be,a(s.product.category?.name||"غير مصنف"),1),t("td",me,a(s.unit.name),1),t("td",xe,a(s.currentQuantity),1),t("td",ye,a(s.purchasePrice.toFixed(2))+" ريال ",1),t("td",he,a((s.currentQuantity*s.purchasePrice).toFixed(2))+" ريال ",1),t("td",fe,[t("span",{class:x(["inline-flex px-2 py-1 text-xs font-semibold rounded-full",O(s.currentQuantity)])},a(C(s.currentQuantity)),3)])]))),128))]),t("tfoot",ve,[t("tr",null,[e[32]||(e[32]=t("td",{colspan:"5",class:"px-4 py-3 text-sm font-medium text-gray-900 text-right"}," إجمالي القيمة: ",-1)),t("td",we,a(w.value.totalValue.toFixed(2))+" ريال ",1),e[33]||(e[33]=t("td",null,null,-1))]),t("tr",null,[e[34]||(e[34]=t("td",{colspan:"5",class:"px-4 py-3 text-sm font-medium text-gray-900 text-right"}," إجمالي المنتجات: ",-1)),t("td",ke,a(w.value.totalItems),1),e[35]||(e[35]=t("td",null,null,-1))])])])])])):(l(),d("div",_e," لا توجد بيانات للعرض. يرجى تعديل المرشحات وإنشاء التقرير. "))])])):M("",!0)])])])}}};export{Ae as default};
