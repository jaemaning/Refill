import React from "react"
import Button from "components/elements/Button"
import { useNavigate } from "react-router-dom";

interface LinkProps {
    NextLink: string
}


const NextPrevButtons: React.FC<LinkProps> = ({NextLink}) => {
    const navigate = useNavigate();

    const ConnectPrevLink = () => {
        navigate(-1);
    }
    const ConnectNextLink = () => {
        navigate(NextLink); // 이동할 경로 전달
    }

    return (
        <div className="flex justify-center mt-2.5">
            <div className="next-prev-buttons-box flex justify-end sm:min-w-full md:w-11/12 lg:w-5/6">
            <div className="mr-2.5">
                <Button variant="danger" content="이전 페이지" onClick={ConnectPrevLink}/>
            </div>
            
            <Button content="다음 페이지" onClick={ConnectNextLink}/>
        </div>
        </div>
        
    )
}
export default NextPrevButtons