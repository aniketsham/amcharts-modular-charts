import TabsComp from "@/components/TabsComp";




const data2=  [{
  category: "Research",
  value1: 1000,
  value2: 588
}, {
  category: "Marketing",
  value1: 1200,
  value2: 1800
}, {
  category: "Sales",
  value1: 850,
  value2: 1230
}];

const data=  [{
  category: "Research",
  value1: 100,
  value2: 1088
}, {
  category: "Marketing",
  value1: 1010,
  value2: 1800
}, {
  category: "Sales",
  value1: 1850,
  value2: 120
}];


const pieData2=[{
  country: "Argentina",
  sales: 100
}, {
  country: "Netherlands",
  sales: 160
}, {
  country: "Mexico",
  sales: 100
}, {
  country: "Banlgadesh",
  sales: 1000
}]

const TabsPage = () => {
  return (
    <div className="flex flex-col  justify-center items-center gap-5 py-20 bg-gray-50">
      <h1 className="font-mono font-bold text-2xl">Tabs Page(Am Charts and Ag grid )</h1>

      <div className="py-10 grid grid-cols-3 gap-10">
        <div>
          <TabsComp type="bar" data={data2}/>
        </div>
        <div>
          <TabsComp type="pie" data={pieData2}/>
        </div>
    <div>
      
    <TabsComp type="bar" data={data}/>

    </div>

      </div>
    </div>
  )
}

export default TabsPage
