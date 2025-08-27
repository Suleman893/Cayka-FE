//Component Imports
import BasicInfo from '@components/cards/BasicInfo'
import TriggerInsights from '@components/consumers/cards/TriggerInsights'

//Data Imports
import { consumerFirmware } from '@data/consumers/consumers'

const RightSection = () => {
  return (
    <div className='flex flex-col gap-4'>
      <TriggerInsights value='100' />
      <BasicInfo title='Firmware Version' data={consumerFirmware} />
    </div>
  )
}

export default RightSection
