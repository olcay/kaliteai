import React, { useState } from "react";

import { linkIcon, loader } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

import styles, { layout } from "../style";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      setArticle(newArticle);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Let’s try our service!
        </h2>
        <form className='w-full  h-full'

          onSubmit={handleSubmit}
        >
          <div className='relative flex justify-center items-start w-full h-full'>
            <img
              src={linkIcon}
              alt='link-icon'
              className='absolute left-0 my-2 ml-3 w-5'
            />

            <input
              type='url'
              placeholder='Paste the website link'
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              onKeyDown={handleKeyDown}
              required
              className='url_input peer/url' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
            />
            <button
              type='submit'
              className='submit_btn peer-focus/url:border-gray-700 peer-focus/url:text-gray-700 '
            >
              <p>↵</p>
            </button>
          </div>
          <fieldset className={`${styles.paragraph} pt-5`}>

            <input id="eCommerce" className="mr-2 peer/eCommerce" type="radio" name="status" defaultChecked />
            <label htmlFor="eCommerce" className="pr-10 peer-checked/eCommerce:text-sky-500 cursor-pointer">E-commerce</label>

            <input id="saas" className="mr-2 peer/saas" type="radio" name="status" />
            <label htmlFor="saas" className="pr-10 peer-checked/saas:text-sky-500 cursor-pointer">SaaS</label>

            <input id="blog" className="mr-2 peer/blog" type="radio" name="status" />
            <label htmlFor="blog" className="peer-checked/blog:text-sky-500 cursor-pointer">Blog</label>

            <div className="hidden peer-checked/eCommerce:block">I want you to buy a few items and check if you have same amount of items in the shopping cart.</div>
            <div className="hidden peer-checked/saas:block">I want you to find the login page for users and check if the login form has proper validations.</div>
            <div className="hidden peer-checked/blog:block">I want you to visit a blog post and check if the title is same as the link you clicked.</div>
          </fieldset>
        </form>


      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className=' font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className=' font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}

        <div className='flex flex-col gap-3'>

          <div className='summary_box'>
            <h2 className='font-bold text-xl border-b-white border-b-2'>
              <div className="flex items-center h-8 space-x-1.5 px-3">
                <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
              </div>
            </h2>
            <p className={`${styles.paragraph} pt-5 p-4`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>




    </section>
  );
};

export default Demo;