import React from 'react'
import { useTranslation } from 'react-i18next'

import './styles.css'

export const NoDataFound = () => {
  const { t } = useTranslation()
  return (
    <div id='no-data'>
    <div className='no-data-content'>
      <img src='../Assets/no-data.png' alt='No Data Icon' className='no-data-icon' />
      <p className='no-data-text'>{t('Timecard_nodatafound')}</p>             
    </div>
  </div>
  )
}
