"use strict";(self.webpackChunknimbus_patterns=self.webpackChunknimbus_patterns||[]).push([[8049],{"./packages/react/src/components/EmptyApp/src/emptyApp.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,default:()=>emptyApp_stories});__webpack_require__("./node_modules/react/index.js");var dist=__webpack_require__("./node_modules/@nimbus-ds/components/dist/index.js"),Layout=__webpack_require__("./packages/react/src/components/Layout/src/Layout.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const EmptyAppContentImageElement=({...rest})=>(0,jsx_runtime.jsx)(dist.Box,{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"6",borderWidth:"5",borderStyle:"solid",borderColor:"neutral-interactive",maxWidth:"480px",width:"100%",children:(0,jsx_runtime.jsx)(dist.Thumbnail,{aspectRatio:"4/3",width:"100%",...rest})});EmptyAppContentImageElement.displayName="EmptyAppContentImageElement";try{EmptyAppContentImageElement.displayName="EmptyAppContentImageElement",EmptyAppContentImageElement.__docgenInfo={description:"",displayName:"EmptyAppContentImageElement",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/EmptyApp/src/components/EmptyAppContentImageElement/EmptyAppContentImageElement.tsx#EmptyAppContentImageElement"]={docgenInfo:EmptyAppContentImageElement.__docgenInfo,name:"EmptyAppContentImageElement",path:"packages/react/src/components/EmptyApp/src/components/EmptyAppContentImageElement/EmptyAppContentImageElement.tsx#EmptyAppContentImageElement"})}catch(__react_docgen_typescript_loader_error){}const EmptyAppContentSection=({title,subtitle,actions,children,...rest})=>(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",flexDirection:"column",px:{xs:"4",md:"6"},py:"12",gap:"10",alignItems:"center",maxWidth:"1200px",width:"100%",mx:"auto",...rest,children:[(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",flexDirection:"column",gap:"4",alignItems:"center",children:[(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",flexDirection:"column",gap:"2",alignItems:"center",children:[(0,jsx_runtime.jsx)(dist.Title,{as:"h2",textAlign:"center",children:title}),subtitle&&(0,jsx_runtime.jsx)(dist.Text,{fontSize:"highlight",textAlign:"center",children:subtitle})]}),actions&&(0,jsx_runtime.jsx)(dist.Box,{display:"flex",gap:"2",alignItems:"center",children:actions})]}),children]});EmptyAppContentSection.displayName="EmptyAppContentSection";try{EmptyAppContentSection.displayName="EmptyAppContentSection",EmptyAppContentSection.__docgenInfo={description:"",displayName:"EmptyAppContentSection",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},subtitle:{defaultValue:null,description:"",name:"subtitle",required:!1,type:{name:"string"}},actions:{defaultValue:null,description:"",name:"actions",required:!1,type:{name:"ReactNode"}},children:{defaultValue:null,description:"Element to be rendered inside the Box component.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"div"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/EmptyApp/src/components/EmptyAppContentSection/EmptyAppContentSection.tsx#EmptyAppContentSection"]={docgenInfo:EmptyAppContentSection.__docgenInfo,name:"EmptyAppContentSection",path:"packages/react/src/components/EmptyApp/src/components/EmptyAppContentSection/EmptyAppContentSection.tsx#EmptyAppContentSection"})}catch(__react_docgen_typescript_loader_error){}const EmptyAppContentTextElement=({title,content,bottomDivider=!1,...rest})=>(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)(dist.Box,{...rest,display:"flex",flexDirection:"column",gap:"2",children:[(0,jsx_runtime.jsx)(dist.Title,{as:"h4",children:title}),(0,jsx_runtime.jsx)(dist.Text,{children:content})]}),bottomDivider&&(0,jsx_runtime.jsx)(dist.Box,{width:"100%",borderTopWidth:"1",borderColor:"neutral-surfaceHighlight",borderStyle:"solid"})]});try{EmptyAppContentTextElement.displayName="EmptyAppContentTextElement",EmptyAppContentTextElement.__docgenInfo={description:"",displayName:"EmptyAppContentTextElement",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"string"}},bottomDivider:{defaultValue:{value:"false"},description:"",name:"bottomDivider",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/EmptyApp/src/components/EmptyAppContentTextElement/EmptyAppContentTextElement.tsx#EmptyAppContentTextElement"]={docgenInfo:EmptyAppContentTextElement.__docgenInfo,name:"EmptyAppContentTextElement",path:"packages/react/src/components/EmptyApp/src/components/EmptyAppContentTextElement/EmptyAppContentTextElement.tsx#EmptyAppContentTextElement"})}catch(__react_docgen_typescript_loader_error){}var styles_dist=__webpack_require__("./packages/react/src/components/EmptyApp/node_modules/@nimbus-ds/styles/dist/index.js"),tokens=__webpack_require__("./node_modules/@nimbus-ds/tokens/dist/js/tokens.js"),tokens_default=__webpack_require__.n(tokens);const EmptyAppHeroSection=({title,titleChildren,subtitle,content,actions,...rest})=>{const{currentTheme}=(0,styles_dist.useTheme)(),theme="base"===currentTheme||"next"===currentTheme?"light":"dark";return(0,jsx_runtime.jsx)(dist.Box,{backgroundImage:`linear-gradient(to bottom,${tokens_default().color[theme].primary.interactive.value} 55%,${tokens_default().color[theme].neutral.background.value} 100%)`,minHeight:"560px",pt:{xs:"12",md:"none"},...rest,children:(0,jsx_runtime.jsx)(dist.Box,{display:"flex",flexDirection:{xs:"column",md:"row"},alignItems:{md:"center"},justifyContent:"space-between",gap:"8",py:"4",px:{xs:"4",md:"6"},mx:"auto",maxWidth:"1200px",height:"100%",children:(0,jsx_runtime.jsxs)(Layout.A,{columns:"2 - symmetric",children:[(0,jsx_runtime.jsxs)(Layout.A.Section,{justifyContent:"center",children:[(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",flexDirection:"column",gap:"2",children:[subtitle&&(0,jsx_runtime.jsx)(dist.Title,{as:"h4",color:"neutral-background",children:subtitle}),(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",gap:"2",alignItems:"center",children:[(0,jsx_runtime.jsx)(dist.Title,{as:"h1",color:"neutral-background",children:title}),titleChildren]}),(0,jsx_runtime.jsx)(dist.Text,{color:"neutral-background",fontSize:"highlight",children:content})]}),actions&&(0,jsx_runtime.jsx)(dist.Box,{display:"flex",gap:"2",children:actions})]}),(0,jsx_runtime.jsxs)(Layout.A.Section,{position:"relative",pr:"5",pt:"5",children:[(0,jsx_runtime.jsx)(dist.Box,{borderRadius:"4",overflow:"hidden",position:"relative",zIndex:"200",children:(0,jsx_runtime.jsx)(dist.Thumbnail,{width:"100%",alt:rest.alt,src:rest.src,aspectRatio:"4/3"})}),(0,jsx_runtime.jsx)(dist.Box,{top:{xs:"-4px",md:"-10px"},left:{xs:"4px",md:"10px"},position:"absolute",width:"100%",height:"100%",borderRadius:"4",backgroundColor:"primary-textLow",zIndex:"100"})]})]})})})};EmptyAppHeroSection.displayName="EmptyAppHeroSection";try{EmptyAppHeroSection.displayName="EmptyAppHeroSection",EmptyAppHeroSection.__docgenInfo={description:"",displayName:"EmptyAppHeroSection",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},titleChildren:{defaultValue:null,description:"",name:"titleChildren",required:!1,type:{name:"ReactNode"}},subtitle:{defaultValue:null,description:"",name:"subtitle",required:!1,type:{name:"string"}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"string"}},actions:{defaultValue:null,description:"",name:"actions",required:!1,type:{name:"ReactNode"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"div"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/EmptyApp/src/components/EmptyAppHeroSection/EmptyAppHeroSection.tsx#EmptyAppHeroSection"]={docgenInfo:EmptyAppHeroSection.__docgenInfo,name:"EmptyAppHeroSection",path:"packages/react/src/components/EmptyApp/src/components/EmptyAppHeroSection/EmptyAppHeroSection.tsx#EmptyAppHeroSection"})}catch(__react_docgen_typescript_loader_error){}const EmptyAppPlanCard=({planContext,planName,children,...rest})=>(0,jsx_runtime.jsxs)(dist.Card,{...rest,children:[(0,jsx_runtime.jsx)(dist.Card.Header,{title:planContext}),(0,jsx_runtime.jsx)(dist.Card.Body,{children:(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",flexDirection:"column",gap:"4",children:[(0,jsx_runtime.jsx)(dist.Title,{as:"h2",color:"neutral-textLow",children:planName}),(0,jsx_runtime.jsx)(dist.Box,{width:"100%",borderTopWidth:"1",borderColor:"neutral-surfaceHighlight",borderStyle:"solid"}),(0,jsx_runtime.jsx)(dist.Box,{display:"flex",flexDirection:"column",gap:"1",children})]})})]});EmptyAppPlanCard.displayName="EmptyAppPlanCard";try{EmptyAppPlanCard.displayName="EmptyAppPlanCard",EmptyAppPlanCard.__docgenInfo={description:"",displayName:"EmptyAppPlanCard",props:{planContext:{defaultValue:null,description:"",name:"planContext",required:!0,type:{name:"string"}},planName:{defaultValue:null,description:"",name:"planName",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/EmptyApp/src/components/EmptyAppPlanCard/EmptyAppPlanCard.tsx#EmptyAppPlanCard"]={docgenInfo:EmptyAppPlanCard.__docgenInfo,name:"EmptyAppPlanCard",path:"packages/react/src/components/EmptyApp/src/components/EmptyAppPlanCard/EmptyAppPlanCard.tsx#EmptyAppPlanCard"})}catch(__react_docgen_typescript_loader_error){}var icons_dist=__webpack_require__("./node_modules/@nimbus-ds/icons/dist/index.js");const EmptyAppPlanItem=({disabled=!1,label,...rest})=>(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",alignItems:"center",gap:"2",...rest,children:[disabled?(0,jsx_runtime.jsx)(dist.Icon,{source:(0,jsx_runtime.jsx)(icons_dist.CloseIcon,{}),color:"neutral-textDisabled"}):(0,jsx_runtime.jsx)(dist.Icon,{source:(0,jsx_runtime.jsx)(icons_dist.CheckIcon,{}),color:"success-interactive"}),(0,jsx_runtime.jsx)(dist.Text,{color:disabled?"neutral-textDisabled":"neutral-textHigh",children:label})]});EmptyAppPlanItem.displayName="EmptyAppPlanItem";try{EmptyAppPlanItem.displayName="EmptyAppPlanItem",EmptyAppPlanItem.__docgenInfo={description:"",displayName:"EmptyAppPlanItem",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"div"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/EmptyApp/src/components/EmptyAppPlanItem/EmptyAppPlanItem.tsx#EmptyAppPlanItem"]={docgenInfo:EmptyAppPlanItem.__docgenInfo,name:"EmptyAppPlanItem",path:"packages/react/src/components/EmptyApp/src/components/EmptyAppPlanItem/EmptyAppPlanItem.tsx#EmptyAppPlanItem"})}catch(__react_docgen_typescript_loader_error){}const EmptyApp=({children,...rest})=>(0,jsx_runtime.jsx)(dist.Box,{width:"100%",display:"flex",flexDirection:"column",backgroundColor:"neutral-background",pb:"8",...rest,children});EmptyApp.displayName="EmptyApp",EmptyApp.ContentImageElement=EmptyAppContentImageElement,EmptyApp.ContentSection=EmptyAppContentSection,EmptyApp.ContentTextElement=EmptyAppContentTextElement,EmptyApp.HeroSection=EmptyAppHeroSection,EmptyApp.PlanCard=EmptyAppPlanCard,EmptyApp.PlanItem=EmptyAppPlanItem,EmptyApp.displayName="EmptyApp",EmptyApp.ContentImageElement.displayName="EmptyApp.ContentImageElement",EmptyApp.ContentSection.displayName="EmptyApp.ContentSection",EmptyApp.ContentTextElement.displayName="EmptyApp.ContentTextElement",EmptyApp.HeroSection.displayName="EmptyApp.HeroSection",EmptyApp.PlanCard.displayName="EmptyApp.PlanCard",EmptyApp.PlanItem.displayName="EmptyApp.PlanItem";try{EmptyApp.displayName="EmptyApp",EmptyApp.__docgenInfo={description:"",displayName:"EmptyApp",props:{children:{defaultValue:null,description:"Content of the EmptyApp\n@TJS-type React.ReactNode",name:"children",required:!0,type:{name:"ReactNode"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"div"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/EmptyApp/src/EmptyApp.tsx#EmptyApp"]={docgenInfo:EmptyApp.__docgenInfo,name:"EmptyApp",path:"packages/react/src/components/EmptyApp/src/EmptyApp.tsx#EmptyApp"})}catch(__react_docgen_typescript_loader_error){}const emptyApp_stories={title:"Patterns/EmptyApp",component:EmptyApp,argTypes:{children:{control:{disable:!0}}},tags:["autodocs"]},perfitLogo=(0,jsx_runtime.jsxs)("svg",{width:"127",height:"26",viewBox:"0 0 127 30",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,jsx_runtime.jsxs)("g",{clipPath:"url(#clip0_1_28)",children:[(0,jsx_runtime.jsx)("path",{d:"M48.66 0.48H40.91C39.82 0.48 38.96 1.33 38.96 2.42V27.03C38.96 28.12 39.81 28.98 40.91 28.98C42 28.98 42.86 28.13 42.86 27.03V17.33H48.66C53.75 17.33 56.91 14.09 56.91 8.88C56.91 3.7 53.74 0.48 48.66 0.48ZM52.97 8.89C52.97 11.94 51.25 13.69 48.25 13.69H42.85V4.13H48.25C51.3 4.13 52.97 5.83 52.97 8.89Z",fill:"white"}),(0,jsx_runtime.jsx)("path",{d:"M74.83 17.12C74.83 15.71 74.43 8.71 66.58 8.71C60.95 8.71 57.73 12.43 57.73 18.92C57.73 25.63 60.93 29.18 66.98 29.18C71.03 29.18 73.25 27.16 73.65 26.76C73.97 26.44 74.26 26.06 74.26 25.43C74.26 24.47 73.47 23.68 72.51 23.68C72.01 23.68 71.73 23.84 71.44 24.04C70.35 24.85 69.11 25.65 66.97 25.65C63.75 25.65 61.72 23.64 61.51 20.27H72.64C74.83 20.27 74.83 18.22 74.83 17.12ZM66.58 12.2C69.48 12.2 70.97 13.72 71.13 16.86H61.56C61.95 13.86 63.73 12.2 66.58 12.2Z",fill:"white"}),(0,jsx_runtime.jsx)("path",{d:"M88.34 8.79C86.06 8.79 84.41 9.57 83.24 10.71C82.82 9.48 82.34 8.94 81.48 8.95C80.44 8.96 79.61 9.77 79.61 10.82V27.12C79.61 28.17 80.43 28.98 81.48 28.98C82.53 28.98 83.35 28.16 83.35 27.12V18.13C83.35 14.52 85.17 12.45 88.35 12.45C89.36 12.45 90.18 11.63 90.18 10.63C90.16 9.61 89.43 8.79 88.34 8.79Z",fill:"white"}),(0,jsx_runtime.jsx)("path",{d:"M101.4 0C95.85 0 93.87 3.87 93.87 7.49V27.13C93.87 28.18 94.69 28.99 95.73 28.99C96.78 28.99 97.6 28.17 97.6 27.13V12.84H100.67C101.67 12.84 102.46 12.06 102.46 11.06C102.46 10.06 101.67 9.27 100.67 9.27H97.6V7.49C97.6 4.89 98.88 3.57 101.39 3.57C102.39 3.57 103.18 2.79 103.18 1.79C103.19 0.78 102.4 0 101.4 0Z",fill:"white"}),(0,jsx_runtime.jsx)("path",{d:"M109.45 2.05C108.09 2.05 107.34 2.83 107.34 4.24C107.34 5.54 108.15 6.35 109.45 6.35C110.75 6.35 111.56 5.54 111.56 4.24C111.56 2.82 110.81 2.05 109.45 2.05Z",fill:"white"}),(0,jsx_runtime.jsx)("path",{d:"M109.45 8.95C108.4 8.95 107.59 9.77 107.59 10.82V27.12C107.59 28.17 108.41 28.98 109.45 28.98C110.5 28.98 111.32 28.16 111.32 27.12V10.82C111.32 9.77 110.5 8.95 109.45 8.95Z",fill:"white"}),(0,jsx_runtime.jsx)("path",{d:"M124.19 25.42C123.06 25.42 122.44 24.68 122.44 23.35V12.85H124.47C125.47 12.85 126.25 12.07 126.25 11.07C126.25 10.07 125.47 9.28 124.47 9.28H122.44V5.64C122.44 4.61 121.6 3.77 120.57 3.77C119.58 3.77 118.7 4.64 118.7 5.64V23.35C118.7 26.77 120.85 28.99 124.18 28.99C125.2 28.99 126.01 28.21 126.01 27.21C126.02 26.2 125.21 25.42 124.19 25.42Z",fill:"white"}),(0,jsx_runtime.jsx)("path",{d:"M22.74 16.62V25.23C22.74 25.29 22.69 25.34 22.62 25.34H4.69002C4.63002 25.34 4.57002 25.29 4.57002 25.23V16.55L1.46002 14.47V25.23C1.46002 27.01 2.91002 28.45 4.69002 28.45H22.63C24.41 28.45 25.85 27 25.85 25.23V14.55L22.74 16.62Z",fill:"white"}),(0,jsx_runtime.jsx)("path",{d:"M27.15 1.24C26.9 0.79 26.43 0.5 25.92 0.5C25.69 0.5 25.46 0.56 25.26 0.67L13.59 6.95L2.05 0.76C1.85 0.65 1.62 0.59 1.39 0.59C0.88 0.59 0.4 0.87 0.16 1.33C-0.19 2 0.0600002 2.84 0.72 3.21L12.9 11.34L12.94 11.36C13.14 11.47 13.37 11.53 13.6 11.53C13.83 11.53 14.06 11.47 14.26 11.36L26.6 3.12C27.26 2.75 27.51 1.91 27.15 1.24Z",fill:"white"}),(0,jsx_runtime.jsx)("path",{d:"M27.15 8.88C26.91 8.43 26.44 8.15 25.92 8.15C25.69 8.15 25.46 8.21 25.26 8.32L13.59 14.59L2.05001 8.41C1.85001 8.3 1.62001 8.24 1.39001 8.24C0.88001 8.24 0.40001 8.52 0.16001 8.97C-0.0199897 9.3 -0.0499897 9.68 0.0500103 10.03C0.16001 10.38 0.39001 10.67 0.71001 10.85L12.89 18.98L12.93 19C13.13 19.11 13.36 19.16 13.59 19.16C13.82 19.16 14.05 19.1 14.25 19L26.6 10.76C27.26 10.39 27.51 9.55 27.15 8.88Z",fill:"white"})]}),(0,jsx_runtime.jsx)("defs",{children:(0,jsx_runtime.jsx)("clipPath",{id:"clip0_1_28",children:(0,jsx_runtime.jsx)("rect",{width:"126.25",height:"29.19",fill:"white"})})})]}),basic={render:()=>(0,jsx_runtime.jsxs)(EmptyApp,{children:[(0,jsx_runtime.jsx)(EmptyApp.HeroSection,{subtitle:"Marketing automation",title:"Impulsá tus ventas con",titleChildren:perfitLogo,content:"Aumentá las visitas a tu sitio, captá nuevos suscriptores, optimizá las conversiones, recuperá y fidelizá clientes implementando email marketing y automation.",actions:(0,jsx_runtime.jsx)(dist.Button,{children:"Comenzar ahora"}),alt:"hero image",src:"./static/mockup-perfit.jpg"}),(0,jsx_runtime.jsx)(EmptyApp.ContentSection,{title:"Soluciones para llevar tu negocio al próximo nivel",children:(0,jsx_runtime.jsxs)(Layout.A,{columns:"2 - asymmetric",gap:"6",alignItems:"center",children:[(0,jsx_runtime.jsx)(Layout.A.Section,{alignItems:"center",children:(0,jsx_runtime.jsx)(EmptyApp.ContentImageElement,{alt:"mockup"})}),(0,jsx_runtime.jsxs)(Layout.A.Section,{children:[(0,jsx_runtime.jsx)(EmptyApp.ContentTextElement,{title:"Estrategias efectivas para promocionar tus productos",content:"Enviá campañas de email marketing para comunicar descuentos y novedades de tu negocio, atrayendo más visitantes a tu tienda. Encontrá inspiración con más de 500 plantillas prediseñadas.",bottomDivider:!0}),(0,jsx_runtime.jsx)(EmptyApp.ContentTextElement,{title:"Más carritos y visitas recuperadas",content:"Aumentá tus ventas enviando mensajes automáticos a visitantes que no finalizaron su compra. Incentivalos con cupones de descuento y recomendaciones basadas en sus intereses.",bottomDivider:!0}),(0,jsx_runtime.jsx)(EmptyApp.ContentTextElement,{title:"Cada contacto recibe lo que desea",content:"Segmentá a tus clientes según la cantidad y frecuencia de compra. Premiá a los clientes más fieles e incentivá a volver a quienes hace tiempo no compran. ¡Todo en piloto automático!"})]})]})}),(0,jsx_runtime.jsx)(EmptyApp.ContentSection,{title:"Planes y precios de Marketing Automation",subtitle:"Realizá una prueba gratuita durante 15 días, sin compromisos de compra y en compañía de nuestros especialistas, quienes te ayudarán a conocer todas las funcionalidades.",actions:(0,jsx_runtime.jsx)(dist.Button,{appearance:"primary",children:"Comenzar ahora"}),children:(0,jsx_runtime.jsxs)(Layout.A,{columns:"2 - symmetric",width:"100%",children:[(0,jsx_runtime.jsx)(Layout.A.Section,{children:(0,jsx_runtime.jsxs)(EmptyApp.PlanCard,{planContext:"Plan gratuito",planName:"Gratis para siempre",children:[(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Hasta 500 contactos"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Envío de 2.000 emails/mes"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Campañas simples"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"500+ campañas prediseñadas"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Automations básicos"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Formularios popup de suscripción"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Campañas inteligentes y tests A/B",disabled:!0}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Automations avanzados",disabled:!0}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Segmentación por ciclo de vida",disabled:!0})]})}),(0,jsx_runtime.jsx)(Layout.A.Section,{children:(0,jsx_runtime.jsxs)(EmptyApp.PlanCard,{planContext:"Suscripción mensual",planName:"Desde R$30/mes",children:[(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Hasta 500 contactos"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Envío de 2.000 emails/mes"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Campañas simples"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"500+ campañas prediseñadas"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Automations básicos"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Formularios popup de suscripción"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Campañas inteligentes y tests A/B"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Automations avanzados"}),(0,jsx_runtime.jsx)(EmptyApp.PlanItem,{label:"Segmentación por ciclo de vida"})]})})]})})]})};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  render: () => <EmptyApp>\n      <EmptyApp.HeroSection subtitle="Marketing automation" title="Impulsá tus ventas con" titleChildren={perfitLogo} content="Aumentá las visitas a tu sitio, captá nuevos suscriptores, optimizá las conversiones, recuperá y fidelizá clientes implementando email marketing y automation." actions={<Button>Comenzar ahora</Button>} alt="hero image" src="./static/mockup-perfit.jpg" />\n      <EmptyApp.ContentSection title="Soluciones para llevar tu negocio al próximo nivel">\n        <Layout columns="2 - asymmetric" gap="6" alignItems="center">\n          <Layout.Section alignItems="center">\n            <EmptyApp.ContentImageElement alt="mockup" />\n          </Layout.Section>\n          <Layout.Section>\n            <EmptyApp.ContentTextElement title="Estrategias efectivas para promocionar tus productos" content="Enviá campañas de email marketing para comunicar descuentos y novedades de tu negocio, atrayendo más visitantes a tu tienda. Encontrá inspiración con más de 500 plantillas prediseñadas." bottomDivider />\n            <EmptyApp.ContentTextElement title="Más carritos y visitas recuperadas" content="Aumentá tus ventas enviando mensajes automáticos a visitantes\n              que no finalizaron su compra. Incentivalos con cupones de\n              descuento y recomendaciones basadas en sus intereses." bottomDivider />\n            <EmptyApp.ContentTextElement title="Cada contacto recibe lo que desea" content="Segmentá a tus clientes según la cantidad y frecuencia de compra. Premiá a los clientes más fieles e incentivá a volver a quienes hace tiempo no compran. ¡Todo en piloto automático!" />\n          </Layout.Section>\n        </Layout>\n      </EmptyApp.ContentSection>\n      <EmptyApp.ContentSection title="Planes y precios de Marketing Automation" subtitle="Realizá una prueba gratuita durante 15 días, sin compromisos de compra y en compañía de nuestros especialistas, quienes te ayudarán a conocer todas las funcionalidades." actions={<Button appearance="primary">Comenzar ahora</Button>}>\n        <Layout columns="2 - symmetric" width="100%">\n          <Layout.Section>\n            <EmptyApp.PlanCard planContext="Plan gratuito" planName="Gratis para siempre">\n              <EmptyApp.PlanItem label="Hasta 500 contactos" />\n              <EmptyApp.PlanItem label="Envío de 2.000 emails/mes" />\n              <EmptyApp.PlanItem label="Campañas simples" />\n              <EmptyApp.PlanItem label="500+ campañas prediseñadas" />\n              <EmptyApp.PlanItem label="Automations básicos" />\n              <EmptyApp.PlanItem label="Formularios popup de suscripción" />\n              <EmptyApp.PlanItem label="Campañas inteligentes y tests A/B" disabled />\n              <EmptyApp.PlanItem label="Automations avanzados" disabled />\n              <EmptyApp.PlanItem label="Segmentación por ciclo de vida" disabled />\n            </EmptyApp.PlanCard>\n          </Layout.Section>\n          <Layout.Section>\n            <EmptyApp.PlanCard planContext="Suscripción mensual" planName="Desde R$30/mes">\n              <EmptyApp.PlanItem label="Hasta 500 contactos" />\n              <EmptyApp.PlanItem label="Envío de 2.000 emails/mes" />\n              <EmptyApp.PlanItem label="Campañas simples" />\n              <EmptyApp.PlanItem label="500+ campañas prediseñadas" />\n              <EmptyApp.PlanItem label="Automations básicos" />\n              <EmptyApp.PlanItem label="Formularios popup de suscripción" />\n              <EmptyApp.PlanItem label="Campañas inteligentes y tests A/B" />\n              <EmptyApp.PlanItem label="Automations avanzados" />\n              <EmptyApp.PlanItem label="Segmentación por ciclo de vida" />\n            </EmptyApp.PlanCard>\n          </Layout.Section>\n        </Layout>\n      </EmptyApp.ContentSection>\n    </EmptyApp>\n}',...basic.parameters?.docs?.source}}};const __namedExportsOrder=["basic"]},"./packages/react/src/components/Layout/src/Layout.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Layout});__webpack_require__("./node_modules/react/index.js");var dist=__webpack_require__("./node_modules/@nimbus-ds/components/dist/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const LayoutSection=({className:_className,style:_style,children,...rest})=>(0,jsx_runtime.jsx)(dist.Box,{...rest,boxSizing:"border-box",display:"flex",flexDirection:"column",gap:rest.gap||"4",children});LayoutSection.displayName="LayoutSection";try{LayoutSection.displayName="LayoutSection",LayoutSection.__docgenInfo={description:"",displayName:"LayoutSection",props:{children:{defaultValue:null,description:"Content of the section body.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/Layout/src/components/LayoutSection/LayoutSection.tsx#LayoutSection"]={docgenInfo:LayoutSection.__docgenInfo,name:"LayoutSection",path:"packages/react/src/components/Layout/src/components/LayoutSection/LayoutSection.tsx#LayoutSection"})}catch(__react_docgen_typescript_loader_error){}const colQuantity={1:"1fr","2 - asymmetric":"2fr 1fr","2 - symmetric":"1fr 1fr",3:"1fr 1fr 1fr"},Layout=({className:_className,style:_style,children,columns="1",...rest})=>(0,jsx_runtime.jsx)(dist.Box,{...rest,boxSizing:"border-box",display:"grid",gridTemplateColumns:{xs:"1fr",md:colQuantity[columns]},gridGap:rest.gap||"4",children});Layout.displayName="Layout",Layout.Section=LayoutSection,Layout.displayName="Layout",Layout.Section.displayName="Layout.Section";try{Layout.displayName="Layout",Layout.__docgenInfo={description:"",displayName:"Layout",props:{children:{defaultValue:null,description:"Content to be rendered inside the layout.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},columns:{defaultValue:{value:"1"},description:"Number of columns to be rendered for the children.",name:"columns",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"3"'},{value:'"2 - symmetric"'},{value:'"2 - asymmetric"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/Layout/src/Layout.tsx#Layout"]={docgenInfo:Layout.__docgenInfo,name:"Layout",path:"packages/react/src/components/Layout/src/Layout.tsx#Layout"})}catch(__react_docgen_typescript_loader_error){}}}]);