import React from "react"
import Button from "components/elements/Button"

interface LinkProps {
    PrevLink: string
    NextLink: string
}


const NextPrevButtons: React.FC<LinkProps> = ({PrevLink, NextLink}) => {
    return (
        <div className="flex justify-center mt-2.5">
            <div className="next-prev-buttons-box flex justify-end sm:min-w-full md:w-11/12 lg:w-5/6">
            <div className="mr-2.5">
                <Button variant="danger" content="이전 페이지"/>
            </div>
            
            <Button content="다음 페이지"/>
        </div>
        </div>
        
    )
}
export default NextPrevButtons