import React from "react";
import { Routes, Route } from "react-router-dom";
import BacIIBook from "../CategoryBook/BacIIBook";
import AllCategory from "../CategoryBook/AllCategory";
import ComicBook from "../CategoryBook/ComicBook";
import StudyBook from "../CategoryBook/StudyBook";
import NovelBook from "../CategoryBook/NovelBook";
import { DefaultPage } from "../content/DefualPage/DefualPage";

const ContentSection = () => (
    <div
        id="contentSection"
        className="overflow-y-auto h-full md:h-[1300px] w-full bg-gray-50"
    >
        <Routes>
            <Route path="/bacII" element={<BacIIBook />} />
            <Route path="/comic" element={<ComicBook />} />
            <Route path="/study" element={<StudyBook />} />
            <Route path="/novel" element={<NovelBook />} />
            <Route path="/" element={<AllCategory />} />
            <Route path="*" element={<div className="text-center text-2xl font-medium"><DefaultPage /></div>} />
        </Routes>
    </div>
);

export default ContentSection;
