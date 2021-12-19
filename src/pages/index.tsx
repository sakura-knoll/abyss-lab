import Link from 'next/link'
import React from 'react'
import { Container } from 'react-bootstrap'
import RootNavigator from '../components/organisms/RootNavigator'

const IndexPage = () => {
  return (
    <Container>
      <RootNavigator />

      <div>
        <Link href='/honkai3rd'>
          <a>
            <h2>Honkai 3rd</h2>
          </a>
        </Link>
      </div>
    </Container>
  )
}

export default IndexPage
