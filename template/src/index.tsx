// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import style from './index.css';
//
// const Toast = ({ content }: any) => (
//     <div className={style.toastBox}>{content}</div>
// );
//
// export default function toast(content: any, duration = 1500) {
//     const div = document.createElement('div');
//     ReactDOM.render(React.createElement(Toast, { content }), div);
//     document.body.append(div);
//     if (duration !== 0) {
//         setTimeout(() => {
//             // @ts-ignore
//             div.parentNode.removeChild(div);
//         }, duration);
//     }
// }
