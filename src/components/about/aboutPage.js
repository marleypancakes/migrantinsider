import React from "react"
import SubscribeButton from "../subscriptions/subscribeButton"
const WorkPage = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="mt-10 px-8">
      <h1 className="text-6xl mt-5 mx-20 font-bold text-darkbrown mb-10 text-center border-b-2 border-black pb-10">
              About<br></br>
            </h1>
      <div className="flex gap-10 ">
        <div className="flex-1 justify-center text-center">
        <h3 className="font-normal mt-3 mb-3 text-2xl xxs:text-md xs:text-md sm:text-xl md:text-2xl lg:text-2xl">
          EDITOR
        </h3>
        <p className="text-xl font-bold">Pablo Manriquez</p>
        <h3 className="font-normal mt-6 mb-3 text-2xl xxs:text-md xs:text-md sm:text-xl md:text-2xl lg:text-2xl">
          DEPUTY EDITOR
        </h3>
        <p className="text-xl font-bold">Ale Franqueza</p>
        </div>
        <div className="flex-1 pr-40 text-center">
        <p className=" text-2xl xxs:text-2xl xs:text-3xl sm:text-2xl lg:text-3xl text-darkbrown">
        <span className="italic">Migrant Insider</span> is the first and only immigration news outlet in the Beltway.</p>
        <p className="my-5 text-2xl xxs:text-2xl xs:text-3xl sm:text-2xl lg:text-3xl text-darkbrown"> Subscribe for just $5/month!</p>
        <SubscribeButton></SubscribeButton>
        </div>
      </div>
      </div>
    </div>
  )
}

export default WorkPage
