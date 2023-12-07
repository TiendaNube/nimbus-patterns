(self.webpackChunknimbus_patterns=self.webpackChunknimbus_patterns||[]).push([[7009],{"./node_modules/@nimbus-ds/typings/dist/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{var e;__webpack_require__.g,module.exports=(e=__webpack_require__("./node_modules/react/index.js"),(()=>{"use strict";var r={156:r=>{r.exports=e}},t={};function o(e){var s=t[e];if(void 0!==s)return s.exports;var n=t[e]={exports:{}};return r[e](n,n.exports,o),n.exports}var s={};return(()=>{var e=s;Object.defineProperty(e,"__esModule",{value:!0}),e.useRefObjectAsForwardedRef=void 0;const r=o(156);e.useRefObjectAsForwardedRef=function(e,t){(0,r.useImperativeHandle)(e,(()=>t.current))}})(),s})())},"./packages/react/src/components/FormField/src/formField.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,asInput:()=>asInput,asSelect:()=>asSelect,asTextarea:()=>asTextarea,basic:()=>basic,customContent:()=>customContent,default:()=>__WEBPACK_DEFAULT_EXPORT__,showHelpTextOnFocus:()=>showHelpTextOnFocus});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@nimbus-ds/components/dist/index.js"),_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@nimbus-ds/icons/dist/index.js"),_FormField__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/react/src/components/FormField/src/FormField.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Patterns/FormField",component:_FormField__WEBPACK_IMPORTED_MODULE_2__.W,argTypes:{helpIcon:{control:{disable:!0}},children:{control:{disable:!0}},showHelpText:{defaultValue:!1}},tags:["autodocs"]},basic={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_FormField__WEBPACK_IMPORTED_MODULE_2__.W.Input,{...args,placeholder:"Placeholder"}),args:{label:"Label text",helpText:"Help text",id:"input-id",helpIcon:_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_3__.ExclamationCircleIcon}},asInput={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_FormField__WEBPACK_IMPORTED_MODULE_2__.W.Input,{...args,placeholder:"Placeholder"}),args:{label:"Label text",helpText:"Help text",id:"input-id",helpIcon:_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_3__.ExclamationCircleIcon}},asSelect={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_FormField__WEBPACK_IMPORTED_MODULE_2__.W.Select,{...args,placeholder:"Placeholder"}),args:{label:"Label text",helpText:"Help text",id:"select-id",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_4__.Select.Option,{label:"Option 1",value:"option-1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_4__.Select.Option,{label:"Option 2",value:"option-2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_4__.Select.Option,{label:"Option 3",value:"option-3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_4__.Select.Option,{label:"Option 4",value:"option-4"})]}),helpIcon:_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_3__.ExclamationCircleIcon}},asTextarea={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_FormField__WEBPACK_IMPORTED_MODULE_2__.W.Textarea,{...args,placeholder:"Placeholder"}),args:{label:"Label text",helpText:"Help text",id:"textarea-id",helpIcon:_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_3__.ExclamationCircleIcon}},showHelpTextOnFocus={render:args=>{const[showHelpText,setShowHelpText]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),handleShowTrue=()=>setShowHelpText((prevState=>!prevState));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_FormField__WEBPACK_IMPORTED_MODULE_2__.W.Input,{onFocus:handleShowTrue,onBlur:handleShowTrue,showHelpText,...args})},args:{label:"Click the input to display the help text",helpText:"Help text",id:"input-id",helpIcon:_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_3__.ExclamationCircleIcon}},customContent={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_FormField__WEBPACK_IMPORTED_MODULE_2__.W,{...args,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_4__.Box,{display:"flex",gap:"1",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_4__.Radio,{as:"button",checked:!0,name:"radio",id:"radio-1",label:"Radio 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_4__.Radio,{as:"button",name:"radio",id:"radio-2",label:"Radio 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_4__.Radio,{as:"button",name:"radio",id:"radio-3",label:"Radio 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_4__.Radio,{as:"button",name:"radio",id:"radio-4",label:"Radio 4"})]})}),args:{label:"Label text",helpText:"Help text",helpIcon:_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_3__.ExclamationCircleIcon}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  render: args => <FormField.Input {...args} placeholder="Placeholder" />,\n  args: {\n    label: "Label text",\n    helpText: "Help text",\n    id: "input-id",\n    helpIcon: ExclamationCircleIcon\n  }\n}',...basic.parameters?.docs?.source}}},asInput.parameters={...asInput.parameters,docs:{...asInput.parameters?.docs,source:{originalSource:'{\n  render: args => <FormField.Input {...args} placeholder="Placeholder" />,\n  args: {\n    label: "Label text",\n    helpText: "Help text",\n    id: "input-id",\n    helpIcon: ExclamationCircleIcon\n  }\n}',...asInput.parameters?.docs?.source}}},asSelect.parameters={...asSelect.parameters,docs:{...asSelect.parameters?.docs,source:{originalSource:'{\n  render: (args: FormFieldSelectProps) => <FormField.Select {...args} placeholder="Placeholder" />,\n  args: {\n    label: "Label text",\n    helpText: "Help text",\n    id: "select-id",\n    children: <>\n        <Select.Option label="Option 1" value="option-1" />\n        <Select.Option label="Option 2" value="option-2" />\n        <Select.Option label="Option 3" value="option-3" />\n        <Select.Option label="Option 4" value="option-4" />\n      </>,\n    helpIcon: ExclamationCircleIcon\n  }\n}',...asSelect.parameters?.docs?.source}}},asTextarea.parameters={...asTextarea.parameters,docs:{...asTextarea.parameters?.docs,source:{originalSource:'{\n  render: (args: FormFieldTextareaProps) => <FormField.Textarea {...args} placeholder="Placeholder" />,\n  args: {\n    label: "Label text",\n    helpText: "Help text",\n    id: "textarea-id",\n    helpIcon: ExclamationCircleIcon\n  }\n}',...asTextarea.parameters?.docs?.source}}},showHelpTextOnFocus.parameters={...showHelpTextOnFocus.parameters,docs:{...showHelpTextOnFocus.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    const [showHelpText, setShowHelpText] = useState(false);\n    const handleShowTrue = () => setShowHelpText(prevState => !prevState);\n    return <FormField.Input onFocus={handleShowTrue} onBlur={handleShowTrue} showHelpText={showHelpText} {...args} />;\n  },\n  args: {\n    label: "Click the input to display the help text",\n    helpText: "Help text",\n    id: "input-id",\n    helpIcon: ExclamationCircleIcon\n  }\n}',...showHelpTextOnFocus.parameters?.docs?.source}}},customContent.parameters={...customContent.parameters,docs:{...customContent.parameters?.docs,source:{originalSource:'{\n  render: args => <FormField {...args}>\n      <Box display="flex" gap="1">\n        <Radio as="button" checked name="radio" id="radio-1" label="Radio 1" />\n        <Radio as="button" name="radio" id="radio-2" label="Radio 2" />\n        <Radio as="button" name="radio" id="radio-3" label="Radio 3" />\n        <Radio as="button" name="radio" id="radio-4" label="Radio 4" />\n      </Box>\n    </FormField>,\n  args: {\n    label: "Label text",\n    helpText: "Help text",\n    helpIcon: ExclamationCircleIcon\n  }\n}',...customContent.parameters?.docs?.source}}};const __namedExportsOrder=["basic","asInput","asSelect","asTextarea","showHelpTextOnFocus","customContent"]},"./packages/react/src/components/FormField/src/FormField.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{W:()=>FormField});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/@nimbus-ds/components/dist/index.js");const inputAppearance={danger:"danger",warning:"warning",success:"success",none:"neutral"},helpTextAppearance={danger:"danger-textLow",warning:"warning-textLow",success:"success-textLow",none:"neutral-textDisabled"};var typings_dist=__webpack_require__("./node_modules/@nimbus-ds/typings/dist/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FormFieldSelect=(0,react.forwardRef)((({label,helpText,helpIcon:IconSrc,appearance="none",showHelpText=!1,...rest},ref)=>{const selectRef=(0,react.useRef)(null);return(0,typings_dist.useRefObjectAsForwardedRef)(ref,selectRef),(0,jsx_runtime.jsx)(FormField,{label,helpText,helpIcon:IconSrc,appearance,showHelpText,id:rest.id,children:(0,jsx_runtime.jsx)(dist.Select,{ref:selectRef,...rest,appearance:inputAppearance[appearance]})})}));try{FormFieldSelect.displayName="FormFieldSelect",FormFieldSelect.__docgenInfo={description:"",displayName:"FormFieldSelect",props:{label:{defaultValue:null,description:"Optional label for the field component.\n@TJS-type React.ReactNode",name:"label",required:!1,type:{name:"ReactNode"}},appearance:{defaultValue:{value:"none"},description:"Appearance of the field and help text elements.",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"danger"'},{value:'"warning"'},{value:'"success"'}]}},helpText:{defaultValue:null,description:"Help text displaying optional hints or validation messages under the field.",name:"helpText",required:!1,type:{name:"string"}},helpIcon:{defaultValue:null,description:"Icon supporting the help text message.\n@TJS-type React.FC<IconProps>",name:"helpIcon",required:!1,type:{name:"FC<IconProps>"}},showHelpText:{defaultValue:{value:"false"},description:"Control to conditionally show the help text and icon.",name:"showHelpText",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/FormField/src/components/FormFieldSelect/FormFieldSelect.tsx#FormFieldSelect"]={docgenInfo:FormFieldSelect.__docgenInfo,name:"FormFieldSelect",path:"packages/react/src/components/FormField/src/components/FormFieldSelect/FormFieldSelect.tsx#FormFieldSelect"})}catch(__react_docgen_typescript_loader_error){}const FormFieldTextarea=(0,react.forwardRef)((({label,helpText,helpIcon:IconSrc,appearance="none",showHelpText=!1,...rest},ref)=>{const textAreaRef=(0,react.useRef)(null);return(0,typings_dist.useRefObjectAsForwardedRef)(ref,textAreaRef),(0,jsx_runtime.jsx)(FormField,{label,helpText,helpIcon:IconSrc,appearance,showHelpText,id:rest.id,children:(0,jsx_runtime.jsx)(dist.Textarea,{ref:textAreaRef,...rest,appearance:inputAppearance[appearance]})})}));try{FormFieldTextarea.displayName="FormFieldTextarea",FormFieldTextarea.__docgenInfo={description:"",displayName:"FormFieldTextarea",props:{label:{defaultValue:null,description:"Optional label for the field component.\n@TJS-type React.ReactNode",name:"label",required:!1,type:{name:"ReactNode"}},appearance:{defaultValue:{value:"none"},description:"Appearance of the field and help text elements.",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"danger"'},{value:'"warning"'},{value:'"success"'}]}},helpText:{defaultValue:null,description:"Help text displaying optional hints or validation messages under the field.",name:"helpText",required:!1,type:{name:"string"}},helpIcon:{defaultValue:null,description:"Icon supporting the help text message.\n@TJS-type React.FC<IconProps>",name:"helpIcon",required:!1,type:{name:"FC<IconProps>"}},showHelpText:{defaultValue:{value:"false"},description:"Control to conditionally show the help text and icon.",name:"showHelpText",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/FormField/src/components/FormFieldTextarea/FormFieldTextarea.tsx#FormFieldTextarea"]={docgenInfo:FormFieldTextarea.__docgenInfo,name:"FormFieldTextarea",path:"packages/react/src/components/FormField/src/components/FormFieldTextarea/FormFieldTextarea.tsx#FormFieldTextarea"})}catch(__react_docgen_typescript_loader_error){}const FormFieldInput=(0,react.forwardRef)((({label,helpText,helpIcon:IconSrc,appearance="none",showHelpText=!1,...rest},ref)=>{const inputRef=(0,react.useRef)(null);return(0,typings_dist.useRefObjectAsForwardedRef)(ref,inputRef),(0,jsx_runtime.jsx)(FormField,{label,helpText,helpIcon:IconSrc,appearance,showHelpText,id:rest.id,children:(0,jsx_runtime.jsx)(dist.Input,{ref:inputRef,...rest,appearance:inputAppearance[appearance]})})}));try{FormFieldInput.displayName="FormFieldInput",FormFieldInput.__docgenInfo={description:"",displayName:"FormFieldInput",props:{label:{defaultValue:null,description:"Optional label for the field component.\n@TJS-type React.ReactNode",name:"label",required:!1,type:{name:"ReactNode"}},appearance:{defaultValue:{value:"none"},description:"Appearance of the field and help text elements.",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"danger"'},{value:'"warning"'},{value:'"success"'}]}},helpText:{defaultValue:null,description:"Help text displaying optional hints or validation messages under the field.",name:"helpText",required:!1,type:{name:"string"}},helpIcon:{defaultValue:null,description:"Icon supporting the help text message.\n@TJS-type React.FC<IconProps>",name:"helpIcon",required:!1,type:{name:"FC<IconProps>"}},showHelpText:{defaultValue:{value:"false"},description:"Control to conditionally show the help text and icon.",name:"showHelpText",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/FormField/src/components/FormFieldInput/FormFieldInput.tsx#FormFieldInput"]={docgenInfo:FormFieldInput.__docgenInfo,name:"FormFieldInput",path:"packages/react/src/components/FormField/src/components/FormFieldInput/FormFieldInput.tsx#FormFieldInput"})}catch(__react_docgen_typescript_loader_error){}const FormField=({label,helpText,helpIcon:IconSrc,appearance="none",showHelpText=!1,children,...rest})=>(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",flexDirection:"column",gap:"2",width:"100%",children:[label&&(0,jsx_runtime.jsx)(dist.Label,{htmlFor:rest.id,children:label}),children,showHelpText&&(0,jsx_runtime.jsxs)(dist.Box,{display:"inline-flex",gap:"1",children:[IconSrc&&(0,jsx_runtime.jsx)(dist.Icon,{color:helpTextAppearance[appearance],source:(0,jsx_runtime.jsx)(IconSrc,{size:12})}),helpText&&(0,jsx_runtime.jsx)(dist.Text,{color:helpTextAppearance[appearance],fontSize:"caption",children:helpText})]})]});FormField.displayName="FormField",FormField.displayName="FormField",FormField.Select=FormFieldSelect,FormField.Textarea=FormFieldTextarea,FormField.Input=FormFieldInput,FormField.Select.displayName="FormField.Select",FormField.Textarea.displayName="FormField.Textarea",FormField.Input.displayName="FormField.Input";try{FormField.displayName="FormField",FormField.__docgenInfo={description:"",displayName:"FormField",props:{label:{defaultValue:null,description:"Optional label for the field component.\n@TJS-type React.ReactNode",name:"label",required:!1,type:{name:"ReactNode"}},helpText:{defaultValue:null,description:"Help text displaying optional hints or validation messages under the field.",name:"helpText",required:!1,type:{name:"string"}},helpIcon:{defaultValue:null,description:"Icon supporting the help text message.\n@TJS-type React.FC<IconProps>",name:"helpIcon",required:!1,type:{name:"FC<IconProps>"}},appearance:{defaultValue:{value:"none"},description:"Appearance of the field and help text elements.",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"danger"'},{value:'"warning"'},{value:'"success"'}]}},showHelpText:{defaultValue:{value:"false"},description:"Control to conditionally show the help text and icon.",name:"showHelpText",required:!1,type:{name:"boolean"}},children:{defaultValue:null,description:"Content of the field.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/FormField/src/FormField.tsx#FormField"]={docgenInfo:FormField.__docgenInfo,name:"FormField",path:"packages/react/src/components/FormField/src/FormField.tsx#FormField"})}catch(__react_docgen_typescript_loader_error){}}}]);