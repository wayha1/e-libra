import React from 'react'
import BacIIBook from './BacIIBook'
import ComicBook from './ComicBook'
import NovelBook from './NovelBook'
import StudyBook from './StudyBook'

const AllCategory = () => {

  return (
   <div>
      <h2 className="text-5xl font-bold mb-4 mt-8 ml-5 uppercase">All Categories</h2>
      <div className='p-2'>
        <div className="">
            <BacIIBook className="" />
          </div>
          <div className="">
            <ComicBook className="" />
          </div>
          <div>
            <StudyBook />
          </div>
          <div>
            <NovelBook />
          </div>
      </div>
    </div>
  )
}

export default AllCategory
