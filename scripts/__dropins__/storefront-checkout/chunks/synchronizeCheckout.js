/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as i}from"./store-config.js";import{d as C,j as y,c as m,e as R,l as z}from"./transform-store-config.js";import{events as c}from"@dropins/tools/event-bus.js";import{merge as A,Initializer as G}from"@dropins/tools/lib.js";import{CHECKOUT_DATA_FRAGMENT as b,CUSTOMER_FRAGMENT as O}from"../fragments.js";import{F as $,M as U}from"./errors.js";const D=async(e=!1)=>{i.authenticated=e,e?await me():C.value={pending:!1,data:null}},x={cartUpdate:{requests:[]},default:{requests:[]}};function F(e,t="default"){const r=x[t];return new Promise((n,o)=>{r.requests.push(e);const a=()=>{r.requests[0]===e?e().then(n).catch(o).finally(()=>{var l;r.requests.shift(),r.requests.length===0?(l=r.onComplete)==null||l.call(r):a()}):setTimeout(a,100)};a()})}function Q(e,t){const r=x[e];r.onComplete=t}const V=["sender_email","recipient_email"];function B(e){return e.filter(t=>!t.path||!V.some(r=>{var n;return((n=t.path)==null?void 0:n.at(-1))===r}))}const v=e=>{throw e instanceof DOMException&&e.name==="AbortError"||c.emit("error",{source:"checkout",type:"network",error:e}),e},H={cart:m,customer:C,estimateShippingMethods:R};function K(e,t){return t.split(".").reduce((r,n)=>r&&r[n]!==void 0?r[n]:void 0,e)}const _={cart:null,customer:null,estimateShippingMethods:null};async function E(e){const{defaultValueOnFail:t,options:r,path:n,query:o,queueName:a,signalType:l,transformer:p,type:P}=e,s=H[l],d=Symbol();_[l]=d,s.value={...s.value,pending:!0};try{const{data:f,errors:h}=await(P==="mutation"?F(()=>y(o,r).catch(v),a):y(o,{method:"GET",cache:"no-cache",...r}).catch(v));if(h){const g=B(h);if(g.length>0)throw new $(g)}let u=K(f,n);if(u===void 0)throw new Error(`No data found at path: ${n}`);return p&&(u=p(u)),s.value={...s.value,data:u},setTimeout(()=>{s.value={...s.value,pending:_[l]===d?!1:s.value.pending}},0),u}catch(f){if(t)return s.value={pending:!1,data:t},t;if(f.name==="AbortError")return;throw s.value={...s.value,pending:!1},f}}const j=e=>e==null,L=(e,t)=>e.amount.value-t.amount.value,M=e=>!(!e||!e.method_code||!e.method_title||j(e.amount.value)||!e.amount.currency),T=e=>({amount:{value:e.amount.value,currency:e.amount.currency},title:e.method_title,code:e.method_code,carrier:{code:e.carrier_code,title:e.carrier_title},value:`${e.carrier_code} - ${e.method_code}`,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}}}),J=e=>{if(M(e))return T(e)},W=e=>{if(e)return e.filter(M).map(t=>T(t)).sort(L)},X=e=>e?!!e.code&&!!e.label:!1,Y=e=>{if(!X(e))return;const{code:t,label:r,region_id:n}=e;return n?{code:t,name:r,id:n}:{code:t,name:r}},Z=e=>{const{code:t,label:r}=e;return{value:t,label:r}},ee=e=>e?"code"in e&&"value"in e:!1,te=e=>e.filter(ee).map(t=>{const{code:r,value:n}=t;return{code:r,value:n}}),S=e=>{const t=e.street.filter(Boolean);return{id:(e==null?void 0:e.id)||void 0,city:e.city,company:e.company||void 0,country:Z(e.country),customAttributes:te(e.custom_attributes),firstName:e.firstname,lastName:e.lastname,postCode:e.postcode||void 0,region:Y(e.region),street:t,telephone:e.telephone||void 0,vatId:e.vat_id||void 0,prefix:e.prefix||void 0,suffix:e.suffix||void 0,middleName:e.middlename||void 0,fax:e.fax||void 0}},re=e=>{if(e)return S(e)},ne=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:r,selected_shipping_method:n,same_as_billing:o,...a}=t;return{...S(a),availableShippingMethods:W(r),selectedShippingMethod:J(n),sameAsBilling:o}}),Ce=e=>({city:e.city,company:e.company,country_code:e.countryCode,custom_attributes:e.customAttributes.map(t=>({attribute_code:t.code,value:t.value})),firstname:e.firstName,lastname:e.lastName,postcode:e.postcode,region:e.region,region_id:e.regionId,save_in_address_book:e.saveInAddressBook??!0,street:e.street,telephone:e.telephone,vat_id:e.vatId,prefix:e.prefix,suffix:e.suffix,middlename:e.middleName,fax:e.fax}),ie=e=>{if(e)return{code:e.code,title:e.title}},oe=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:r,title:n}=t;return{code:r,title:n}})},se=e=>{var r,n,o;if(!e)return;const t={availablePaymentMethods:oe(e.available_payment_methods),billingAddress:re(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,selectedPaymentMethod:ie(e.selected_payment_method),shippingAddresses:ne(e.shipping_addresses),isGuest:!i.authenticated};return A(t,(o=(n=(r=N.getConfig().models)==null?void 0:r.CartModel)==null?void 0:n.transformer)==null?void 0:o.call(n,e))},ce=e=>{var r,n,o;if(!e)return;const t={firstName:e.firstname||"",lastName:e.lastname||"",email:e.email||""};return A(t,(o=(n=(r=N.getConfig().models)==null?void 0:r.CustomerModel)==null?void 0:n.transformer)==null?void 0:o.call(n,e))},ae=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${b}
`,le=`
  query getCustomerCart {
    cart: customerCart {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${b}
`,w=async()=>{const e=i.cartId,t=i.authenticated===!1,r=t?ae:le,n=t?{cartId:e}:{};if(t&&!e)throw new U;return await E({type:"query",query:r,options:{method:"POST",cache:"no-cache",variables:n},path:"cart",signalType:"cart",transformer:se})},ue=`
  query getCustomer {
    customer {
      ...CUSTOMER_FRAGMENT
    }
  }

  ${O}
`,me=async()=>{if(i.authenticated)return await E({type:"query",query:ue,options:{method:"POST",cache:"no-cache"},path:"customer",signalType:"customer",transformer:ce})},fe=()=>[c.on("authenticated",D,{eager:!0}),c.on("cart/initialized",I,{eager:!0}),c.on("cart/reset",pe),c.on("cart/updated",k)],q=new G({init:async e=>{const t=e||{};q.config.setConfig(t)},listeners:fe}),N=q.config;Q("cartUpdate",()=>{c.emit("checkout/updated",m.value.data)});const I=async e=>{if(i.initialized)return k(e);i.config||(i.config=await z());const t=e?e.id:null;i.cartId=t;const r=t?await w():null;m.value={pending:!1,data:r},i.initialized=!0,c.emit("checkout/initialized",r||null)},pe=()=>{i.cartId=null,m.value={pending:!1,data:null},c.emit("checkout/updated",null)},k=async e=>{if(!i.initialized)return I(e);const t=e?e.id:null;i.cartId=t;const r=t?await w():null;m.value={pending:!1,data:r},c.emit("checkout/updated",r||null)};export{Ce as a,se as b,N as c,E as d,D as e,me as f,w as g,I as h,q as i,v as j,pe as r,k as s,W as t};
