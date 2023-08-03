import React from "react"
const GuideLine: React.FC = () => {
    return (
        <div className="guide-line-text text-white mb-5">
            <ul className="list-disc font-black px-16 py-2">
                <li className="text-3xl py-2">보다 정확한 진단을 위해서 아래의 안내사항을 유의해주세요.
                    <ul className="list-decimal px-8 text-xl pt-1">
                        <li className="py-1">예시로 보여준 올바른 사진을 보시고 정수리를 정확하게 촬영해주세요.</li>
                        <li className="py-1" >배경은 NO 정수리의 사진과 머리카락만 나올 수 있게 밀접해서 찍어주세요.</li>
                        <li className="py-1" >본 진단은 전문의사의 의견이 아님을 알려드립니다.</li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}
export default GuideLine