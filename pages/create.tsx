import Head from 'next/head';
import { Layout } from '../components/Layout';
import {
  DocumentCheckIcon,
  HandThumbUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export default function CreatePage() {
  return (
    <Layout>
      <Head>
        <title>Blog - Create</title>
      </Head>

      <h1 className="text-2xl font-bold">New draft</h1>

      <form className="my-5 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <input type="text" id="title" className="p-2 rounded" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="font-semibold">
            Content
          </label>
          <textarea
            id="content"
            cols={30}
            rows={10}
            className="p-3 rounded"
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          {true ? (
            <DocumentCheckIcon width={25} height={25} />
          ) : (
            <HandThumbUpIcon width={25} height={25} />
          )}
          <div className="flex items-center gap-5">
            <button
              type="submit"
              className="bg-orange-500 text-white rounded px-8 h-12 hover:bg-orange-600"
            >
              Create
            </button>
            <button className="flex gap-2 h-11 items-center px-3 rounded hover:outline">
              <TrashIcon width={25} height={25} /> Delete post
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
