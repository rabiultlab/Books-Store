
import { Link } from 'react-router-dom'

const BookCard = ({data}) => {
  return (
    <>
    <Link to={`/view-book-details/${data._id}`}>
    <div className='bg-zinc-700 p-4 rounded flex flex-col'>
      <div className='bg-zinc-900 rounded flex items-center justify-center'><img src={data.url} alt="/" className='h-[25vh] rounded'/></div>
      <h2 className='mt-4 text-xl font-semibold text-white'>{data.title}</h2>
      <p className='mt-2 text-zinc-400 font-semibold text-xl'>by {data.author}</p>
      <p className='mt-2 text-zinc-200 font-semibold text-xl'>Price : ${data.price}</p>
    </div>
    </Link>
    </>
  )
}

export default BookCard