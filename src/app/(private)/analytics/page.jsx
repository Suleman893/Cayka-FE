//Next Imports
import dynamic from 'next/dynamic'

//Component Imports
import TabComp from '@core/components/mui/TabComp'

//Data Imports
import { tabsOption } from '@data/analytics/analytics'

//Component Imports
const ServerAnalytics = dynamic(() => import('@views/analytics/ServerAnalytics'))
const GeneralAnalytics = dynamic(() => import('@views/analytics/GeneralAnalytics'))

const tabContentList = () => ({
  serverAnalytics: <ServerAnalytics />,
  generalAnalytics: <GeneralAnalytics />
})

export default function Page() {
  return <TabComp initialActiveTab='serverAnalytics' tabContentList={tabContentList()} tabsOption={tabsOption} />
}
