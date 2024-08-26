import React from "react";
import { Link } from "react-router-dom";
import blogData from "../../assets/data/blogData";

const BlogList = () => {
  return (
    <>
      {blogData.map((item) => (
        <BlogItem item={item} key={item.id} />
      ))}
    </>
  );
};

const BlogItem = ({ item }) => {
  const { imgUrl, title, author, date, description, time } = item;

  return (
    <div className="lg:w-1/3 md:w-1/2 w-full mb-5 px-3">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <img src={imgUrl} alt={title} className="w-full object-cover" />
        <div className="p-4">
          <Link
            to={`/blogs/${title}`}
            className="text-xl font-semibold text-blue-900 hover:text-yellow-500 transition duration-300"
          >
            {title}
          </Link>
          <p className="text-gray-700 mt-3">
            {description.length > 100
              ? `${description.substr(0, 100)}...`
              : description}
          </p>

          <Link
            to={`/blogs/${title}`}
            className="text-yellow-500 font-semibold mt-3 inline-block hover:text-yellow-600"
          >
            Read More
          </Link>

          <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between items-center">
            <span className="text-blue-900 font-semibold flex items-center gap-2">
              <i className="ri-user-line"></i> {author}
            </span>

            <div className="flex items-center gap-3 text-gray-600">
              <span className="flex items-center gap-1">
                <i className="ri-calendar-line"></i> {date}
              </span>

              <span className="flex items-center gap-1">
                <i className="ri-time-line"></i> {time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
