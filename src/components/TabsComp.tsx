import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import MyChart, { DataItem, pieDataType } from "@/components/Charts"
import AgTable from "@/components/agtable"
const TabsComp = ({data,type}:{data:DataItem[] | pieDataType[],type:"pie"|"bar"}) => {
  return (
    <div className="flex flex-col  justify-center items-center gap-5 py-20 bg-gray-50">

      <div className="py-10">
        <div>

      <Tabs defaultValue="table" className="w-[600px] border-2 border-gray-300 p-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="table">Table</TabsTrigger>
        <TabsTrigger value="charts">Charts</TabsTrigger>
      </TabsList>
      <TabsContent value="table" >
        <Card>
          
          <CardContent className="space-y-2">
          <AgTable data={data}/>
          </CardContent>
         
        </Card>
      </TabsContent>
      <TabsContent value="charts">
        <Card>
          
          <CardContent className="space-y-2">
          <MyChart type={type}  newdata={data} color={["#0A97B0","#0A5EB0"]} 
        rounded={true}  
        xAxisLabel="Category" 
        yAxisLabel="Sales" 
        legend={true}
        legendConfig={{fontSize: 15,legendText:"{name}  year"}} cursor={true} 
        />
           
          </CardContent>
          
        </Card>
      </TabsContent>
    </Tabs>
        </div>
    

      </div>
    </div>
  )
}

export default TabsComp
