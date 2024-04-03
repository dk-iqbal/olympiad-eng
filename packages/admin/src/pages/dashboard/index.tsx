import { useEffect, useState } from 'react'
import * as React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material'
import CardWithIcon from '../../layouts/components/common/Card'
import BaseLayout from '../../layouts/components/common/BaseLayout'
import Icon from 'src/@core/components/icon'
import { CourseSummary, getCourseSummaryByCourseType } from 'src/utils/functions/courseDetailsFunciton';
import { COURSE_TYPE } from 'src/utils/util';
import dynamic from "next/dynamic";

const Dashboard = () => {
  const PieActiveArc = dynamic(() => import("./PieChart"), { ssr: false });

  const [state, setState] = useState<CourseSummary>()
  const getCourseSummary = async () => {
    try {
      const response = await getCourseSummaryByCourseType(COURSE_TYPE.COURSE)
      setState(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCourseSummary()
  }, [])

  const cardData = [
    {
      id: 1,
      href: '',
      icon: <Icon icon='tabler:file-text' fontSize={30} />,
      count: state?.totalCourse,
      label: 'Number courses'
    },
    {
      id: 2,
      href: '',
      icon: <Icon icon='tabler:book-filled' fontSize={30} />,
      count: state?.totalLesson,
      label: 'Number of lessons'
    },
    {
      id: 3,
      href: '',
      icon: <Icon icon='tabler:package' fontSize={30} />,
      count: state?.totalEnrollment,
      label: 'Number enrolment'
    },
    {
      id: 4,
      href: '',
      icon: <Icon icon='tabler:users-group' fontSize={30} />,
      count: state?.totalStudent,
      label: 'Number of students'
    }
  ]


  return (
    <BaseLayout heading='Dashboard'>
      <Grid container spacing={2}>
        {cardData?.map(card => (
          <CardWithIcon key={card.label} href={card.href} icon={card.icon} count={card.count} label={card.label} />
        ))}
      </Grid>

      <Card sx={{ mt: 2 }}>
        <CardContent sx={{ justifyContent: 'center' }}>
          <Typography variant='h4' className='header-title mb-4'>
            Course overview
          </Typography>

          <PieActiveArc data={[
            { id: 0, value: state?.totalActiveCourse, label: 'Approved' },
            { id: 1, value: state?.totalPendingCourse, label: 'Pending' }
          ]} />
          <Grid container spacing={2} justifyContent='center' alignItems='center'>
            <Grid item xs={6}>
              {/* <TrendingUp color="success" sx={{ mt: 3, fontSize: 40 }} /> */}
              <Typography variant='h3' fontWeight='normal'>
                <span>{state?.totalActiveCourse}</span>
              </Typography>
              <Typography variant='body2' color='text.secondary' mb={0}>
                Active courses
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign='right'>
              {/* <TrendingDown color="warning" sx={{ mt: 3, fontSize: 40 }} /> */}
              <Typography variant='h3' fontWeight='normal'>
                <span>{state?.totalPendingCourse}</span>
              </Typography>
              <Typography variant='body2' color='text.secondary' mb={0}>
                Pending courses
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </BaseLayout>
  )
}

export default Dashboard
