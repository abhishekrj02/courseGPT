import { AlarmClockMinus, Clock3Icon } from 'lucide-react';
import React from 'react'

function ChapterListCard({chapter, index}) {
  return (
    <div className='grid grid-cols-5 py-3 px-2 items-center border-b'>
      <div>
        <h2 className='p-1 bg-primary text-white rounded-3xl w-8 h-8 text-center '>{index+1}</h2>
      </div>
      <div className='col-span-4'>
        <h2 className='font-medium'>{chapter.chapterName}</h2>
        <h2 className='flex items-center gap-2 text-primary text-sm'><Clock3Icon className='h-5 w-5'/>{chapter.duration}</h2>
      </div>
    </div>
  )
}

export default ChapterListCard;