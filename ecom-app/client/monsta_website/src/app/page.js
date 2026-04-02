
import Index from "./homePageComponents/Index";
import { getProductbyType } from "./services/homeServices";





export default async  function Home() {

   let data=await getProductbyType(1)
  
   

  return (
      <>
      <Index  productData={data} />
      </>
  );
}
