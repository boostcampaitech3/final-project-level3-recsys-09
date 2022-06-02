import React, { Component } from "react";

class NaverLogin extends Component {
    
    componentDidMount(){
        const naverScript = document.createElement("script");
        naverScript.src =
            "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
        naverScript.type = "text/javascript";
        document.head.appendChild(naverScript)

        naverScript.onload = () => {
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId: "qpy8MXPAF2Hd4gR2xr_9",
                callbackUrl: "http://localhost:3000/",
                callbackHandle: true,
                isPopup: false,
                loginButton: {
                    color: "green",
                    type: 3,
                    height : 60
                },
            });


            naverLogin.init();
            naverLogin.logout();
            naverLogin.getLoginStatus((status) =>{
                if (status) {
                    console.log("Naver 로그인 상태", naverLogin.user);
                    const { id, email, gender } = naverLogin.user;
                }

                else{
                    console.log("Naver 비 로그인 상태")
                    
                }
            })
        }
    }

    render() {
        return <div id="naverIdLogin"></div>
    }
}

export default NaverLogin