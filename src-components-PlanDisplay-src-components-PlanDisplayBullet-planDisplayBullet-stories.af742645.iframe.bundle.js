"use strict";(self.webpackChunknimbus_patterns=self.webpackChunknimbus_patterns||[]).push([[8345],{"./packages/react/src/components/PlanDisplay/src/components/PlanDisplayBullet/planDisplayBullet.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,base:()=>base,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@nimbus-ds/icons/dist/index.js"),_PlanDisplay__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/react/src/components/PlanDisplay/src/PlanDisplay.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Patterns/PlanDisplay/PlanDisplay.Bullet",component:_PlanDisplay__WEBPACK_IMPORTED_MODULE_2__.K.Bullet,argTypes:{children:{control:{type:"text"}},icon:{control:{disable:!0}}},render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_PlanDisplay__WEBPACK_IMPORTED_MODULE_2__.K.Bullet,{...args,icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_3__.TiendanubeIcon,{})}),tags:["autodocs"]},base={args:{children:"Plan display bullet"}};base.parameters={...base.parameters,docs:{...base.parameters?.docs,source:{originalSource:'{\n  args: {\n    children: "Plan display bullet"\n  }\n}',...base.parameters?.docs?.source}}};const __namedExportsOrder=["base"]},"./packages/react/src/components/PlanDisplay/src/PlanDisplay.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>PlanDisplay});__webpack_require__("./node_modules/react/index.js");var dist=__webpack_require__("./node_modules/@nimbus-ds/components/dist/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const PlanDisplayCard=({highlighted,children,...rest})=>(0,jsx_runtime.jsx)(dist.Box,{...highlighted?{borderColor:"primary-interactive",borderRadius:"2",borderStyle:"solid",borderWidth:"3",boxShadow:"3"}:{},...rest,children:(0,jsx_runtime.jsx)(dist.Card,{children})});PlanDisplayCard.displayName="PlanDisplayCard";try{PlanDisplayCard.displayName="PlanDisplayCard",PlanDisplayCard.__docgenInfo={description:"",displayName:"PlanDisplayCard",props:{highlighted:{defaultValue:null,description:"",name:"highlighted",required:!1,type:{name:"boolean"}},children:{defaultValue:null,description:"Element to be rendered inside the Box component.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"div"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/PlanDisplay/src/components/PlanDisplayCard/PlanDisplayCard.tsx#PlanDisplayCard"]={docgenInfo:PlanDisplayCard.__docgenInfo,name:"PlanDisplayCard",path:"packages/react/src/components/PlanDisplay/src/components/PlanDisplayCard/PlanDisplayCard.tsx#PlanDisplayCard"})}catch(__react_docgen_typescript_loader_error){}const PlanDisplayCardHeader=({subtitle,title,children})=>(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",flexDirection:"column",children:[(0,jsx_runtime.jsx)(dist.Text,{fontWeight:"bold",fontSize:"highlight",children:subtitle}),title,children&&(0,jsx_runtime.jsx)(dist.Box,{pt:"3",pb:"4",children})]});PlanDisplayCardHeader.displayName="PlanDisplayCardHeader";try{PlanDisplayCardHeader.displayName="PlanDisplayCardHeader",PlanDisplayCardHeader.__docgenInfo={description:"",displayName:"PlanDisplayCardHeader",props:{subtitle:{defaultValue:null,description:"",name:"subtitle",required:!0,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/PlanDisplay/src/components/PlanDisplayCardHeader/PlanDisplayCardHeader.tsx#PlanDisplayCardHeader"]={docgenInfo:PlanDisplayCardHeader.__docgenInfo,name:"PlanDisplayCardHeader",path:"packages/react/src/components/PlanDisplay/src/components/PlanDisplayCardHeader/PlanDisplayCardHeader.tsx#PlanDisplayCardHeader"})}catch(__react_docgen_typescript_loader_error){}const PlanDisplayCardSpacing=props=>(0,jsx_runtime.jsx)(dist.Box,{...props,borderTopWidth:"1",borderColor:"neutral-surface",borderStyle:"solid",my:"1"});PlanDisplayCardSpacing.displayName="PlanDisplayCardSpacing";try{PlanDisplayCardSpacing.displayName="PlanDisplayCardSpacing",PlanDisplayCardSpacing.__docgenInfo={description:"",displayName:"PlanDisplayCardSpacing",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"div"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/PlanDisplay/src/components/PlanDisplayCardSpacing/PlanDisplayCardSpacing.tsx#PlanDisplayCardSpacing"]={docgenInfo:PlanDisplayCardSpacing.__docgenInfo,name:"PlanDisplayCardSpacing",path:"packages/react/src/components/PlanDisplay/src/components/PlanDisplayCardSpacing/PlanDisplayCardSpacing.tsx#PlanDisplayCardSpacing"})}catch(__react_docgen_typescript_loader_error){}const components_PlanDisplayCardSpacing=PlanDisplayCardSpacing,PlanDisplayCardContent=({children})=>(0,jsx_runtime.jsxs)(dist.Card.Body,{children:[(0,jsx_runtime.jsx)(components_PlanDisplayCardSpacing,{}),(0,jsx_runtime.jsx)(dist.Box,{display:"flex",flexDirection:"column",gap:"1",py:"4",children})]});PlanDisplayCardContent.displayName="PlanDisplayCardContent";try{PlanDisplayCardContent.displayName="PlanDisplayCardContent",PlanDisplayCardContent.__docgenInfo={description:"",displayName:"PlanDisplayCardContent",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/PlanDisplay/src/components/PlanDisplayCardContent/PlanDisplayCardContent.tsx#PlanDisplayCardContent"]={docgenInfo:PlanDisplayCardContent.__docgenInfo,name:"PlanDisplayCardContent",path:"packages/react/src/components/PlanDisplay/src/components/PlanDisplayCardContent/PlanDisplayCardContent.tsx#PlanDisplayCardContent"})}catch(__react_docgen_typescript_loader_error){}const PlanDisplayBullet=({icon,disabled,children})=>(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",gap:"2",children:[(0,jsx_runtime.jsx)(dist.Box,{display:"flex",alignItems:"center",children:(0,jsx_runtime.jsx)(dist.Text,{as:"span",color:disabled?"neutral-interactive":"success-interactive",children:(0,jsx_runtime.jsx)(dist.Box,{display:"flex",alignItems:"center",children:icon})})}),(0,jsx_runtime.jsx)(dist.Text,{fontWeight:"medium",color:disabled?"neutral-interactive":"neutral-textLow",children})]});PlanDisplayBullet.displayName="PlanDisplayBullet";try{PlanDisplayBullet.displayName="PlanDisplayBullet",PlanDisplayBullet.__docgenInfo={description:"",displayName:"PlanDisplayBullet",props:{icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"ReactNode"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/PlanDisplay/src/components/PlanDisplayBullet/PlanDisplayBullet.tsx#PlanDisplayBullet"]={docgenInfo:PlanDisplayBullet.__docgenInfo,name:"PlanDisplayBullet",path:"packages/react/src/components/PlanDisplay/src/components/PlanDisplayBullet/PlanDisplayBullet.tsx#PlanDisplayBullet"})}catch(__react_docgen_typescript_loader_error){}const PlanDisplayCardFooter=({children})=>(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",flexDirection:"column",gap:"4",children:[(0,jsx_runtime.jsx)(components_PlanDisplayCardSpacing,{}),(0,jsx_runtime.jsx)(dist.Box,{children})]});PlanDisplayCardFooter.displayName="PlanDisplayCardFooter";try{PlanDisplayCardFooter.displayName="PlanDisplayCardFooter",PlanDisplayCardFooter.__docgenInfo={description:"",displayName:"PlanDisplayCardFooter",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/PlanDisplay/src/components/PlanDisplayCardFooter/PlanDisplayCardFooter.tsx#PlanDisplayCardFooter"]={docgenInfo:PlanDisplayCardFooter.__docgenInfo,name:"PlanDisplayCardFooter",path:"packages/react/src/components/PlanDisplay/src/components/PlanDisplayCardFooter/PlanDisplayCardFooter.tsx#PlanDisplayCardFooter"})}catch(__react_docgen_typescript_loader_error){}const PlanDisplay=({minPlanWidth="225px",children,...rest})=>(0,jsx_runtime.jsx)(dist.Box,{display:"grid",gridTemplateColumns:`repeat(auto-fit, minmax(${minPlanWidth}, 1fr))`,gap:"6",justifyContent:"center",alignItems:"flex-start",mx:"18",...rest,children});PlanDisplay.displayName="PlanDisplay",PlanDisplay.Card=PlanDisplayCard,PlanDisplay.Header=PlanDisplayCardHeader,PlanDisplay.Content=PlanDisplayCardContent,PlanDisplay.Spacing=PlanDisplayCardSpacing,PlanDisplay.Bullet=PlanDisplayBullet,PlanDisplay.Footer=PlanDisplayCardFooter,PlanDisplay.displayName="PlanDisplay",PlanDisplay.Card.displayName="PlanDisplay.PlanDisplayCard",PlanDisplay.Bullet.displayName="PlanDisplay.PlanDisplayBullet",PlanDisplay.Header.displayName="PlanDisplay.PlanDisplayCardHeader",PlanDisplay.Content.displayName="PlanDisplay.PlanDisplayCardContent",PlanDisplay.Spacing.displayName="PlanDisplay.PlanDisplayCardSpacing";try{PlanDisplay.displayName="PlanDisplay",PlanDisplay.__docgenInfo={description:"",displayName:"PlanDisplay",props:{minPlanWidth:{defaultValue:{value:"225px"},description:"",name:"minPlanWidth",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"Content of the PlanDisplay\n@TJS-type React.ReactNode",name:"children",required:!0,type:{name:"ReactNode"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"div"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/PlanDisplay/src/PlanDisplay.tsx#PlanDisplay"]={docgenInfo:PlanDisplay.__docgenInfo,name:"PlanDisplay",path:"packages/react/src/components/PlanDisplay/src/PlanDisplay.tsx#PlanDisplay"})}catch(__react_docgen_typescript_loader_error){}}}]);