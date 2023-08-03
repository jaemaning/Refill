import React from "react"

interface ContentItemProps {
    colStart: string
    colEnd: string
    title: string
    content1?: React.ReactElement
    content2?: React.ReactElement
}

const ContentItem: React.FC<ContentItemProps> = ({title, colStart, colEnd, content1, content2}) => {
    return (
        <div className={`${colStart} ${colEnd} font-black text-white`}>
        <div className="mb-2">
          <p className="p-2 text-3xl">{title}</p>
        </div>
        <div className="w-full md:h-80 lg:96 sm:h-60 p-5 bg-black rounded-lg">
            {content1}
            {content2}
        </div>
      </div>
    )
}
export default ContentItem