/** @jsxImportSource theme-ui */
import { NextPageContext } from 'next'
import {
  getVersion,
  listVersionData,
  VersionData,
} from '../../../data/honkai3rd/versions'

interface VersionShowPageProps {
  versionData: VersionData
}

const VersionShowPage = ({ versionData }: VersionShowPageProps) => {
  return (
    <div>
      {versionData.version} : {versionData.name}
      <pre>
        <code>{JSON.stringify(versionData, null, 2)}</code>
      </pre>
    </div>
  )
}

export default VersionShowPage

export async function getStaticProps({
  params,
}: NextPageContext & { params: { versionId: string } }) {
  return {
    props: {
      versionData: getVersion(params.versionId),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: listVersionData().map((versionData) => {
      return {
        params: {
          versionId: versionData.version.toString(),
        },
      }
    }),
    fallback: false,
  }
}
