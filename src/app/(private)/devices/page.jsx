//Next Imports
import dynamic from 'next/dynamic'

//Component Imports
import TabComp from '@core/components/mui/TabComp'

//Data Import
import { tabsOption } from '@data/devices/devices'

//Component Imports
const AssignedDevices = dynamic(() => import('@views/devices/AssignedDevices'))
const UnAssignedDevices = dynamic(() => import('@views/devices/UnAssignedDevices'))

const tabContentList = () => ({
  assignedDevices: <AssignedDevices />,
  unassignedDevices: <UnAssignedDevices />
})

export default function Page() {
  return <TabComp initialActiveTab='assignedDevices' tabContentList={tabContentList()} tabsOption={tabsOption} />
}
