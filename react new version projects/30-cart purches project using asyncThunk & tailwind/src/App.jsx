
import MainLayOut from './components/layout/mainLayOut'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Header from './components/Header'
import PaginateItems from './components/common/paginateProducts'


function App() {
  const { status, items: products } = useSelector((state) => state.products)
  return (
    <MainLayOut>
      <Helmet>
        <title>فروشگاه استیرک برنامه نویسی</title>
      </Helmet>
      <div className='mx-auto max-w-6xl'>
        <Header />
        <PaginateItems productsPerPage={6} status={status} products={products} />
      </div>
    </MainLayOut>
  )
}

export default App
