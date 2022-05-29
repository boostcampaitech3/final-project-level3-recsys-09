import React, { Component } from "react";

class KakaoLogin extends Component {
    componentDidMount(){
        const kakaoScript = document.createElement("script");
        kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
        document.head.appendChild(kakaoScript)

        kakaoScript.onload = () => {
            window.Kakao.init("9e7c0587cd9369c3be6e0fca47bcb9d9");
            window.Kakao.Auth.createLoginButton({
                container: "#kakao-login-btn",
                success: (auth) => {
                    console.log("kakao 로그인 완료", auth);
                    window.Kakao.API.request({
                        url: "/v2/user/me",
                        success: (res) => {
                            console.log("Kakao 사용자 정보", res);
                        },
                    });
                },
                fail: (err) => {
                    console.log(err)
                }
            })
        }
    }

    render() {
        return <button type="button" id="kakao-login-btn"><img
        src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
        width="222px"
      /></button>
    }
}

export default KakaoLogin