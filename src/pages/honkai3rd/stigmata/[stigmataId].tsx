/** @jsxImportSource theme-ui */
import { NextPageContext } from 'next'
import SingleStigmataPage, {
  SingleStigmataPageProps,
} from '../../../components/pages/SingleStigmataPage'
import StigmataSetPage, {
  StigmataSetProps,
} from '../../../components/pages/StigmataSetPage'
import { getI18NProps } from '../../../lib/i18n'
import {
  listStigmata,
  getStigmataById,
  getStigmataListBySetId,
  getStigmataSetBySetId,
  listStigmataSet,
} from '../../../server/data/honkai3rd/stigmata'

type StigmataShowPageProps = SingleStigmataPageProps | StigmataSetProps

const StigmataListPage = (props: StigmataShowPageProps) => {
  if (props.type === 'single') {
    return <SingleStigmataPage {...props} />
  }

  return <StigmataSetPage {...props} />
}

export default StigmataListPage

export async function getStaticProps({
  params,
  locale,
}: NextPageContext & { params: { stigmataId: string } }) {
  const stigmataData = getStigmataById(params.stigmataId)!
  if (stigmataData != null) {
    return {
      props: {
        type: 'single',
        stigmataData: stigmataData,
        stigmataSetList: (getStigmataListBySetId(stigmataData.set!) || []).sort(
          (a, b) => -a.type.localeCompare(b.type)
        ),
        stigmataSet: getStigmataSetBySetId(stigmataData.set!) || null,
      },
    }
  }
  const [stigmataSetId] = params.stigmataId.split('-set')
  const stigmataSet = getStigmataSetBySetId(stigmataSetId)!
  return {
    props: {
      type: 'set',
      stigmataSet,
      stigmataSetList: (getStigmataListBySetId(stigmataSet.id) || []).sort(
        (a, b) => -a.type.localeCompare(b.type)
      ),
      ...(await getI18NProps(locale)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      ...listStigmata().map((stigmata) => {
        return {
          params: { stigmataId: stigmata.id },
        }
      }),
      ...listStigmataSet().map((stigmataSet) => {
        return {
          params: { stigmataId: `${stigmataSet.id}-set` },
        }
      }),
    ],
    fallback: false,
  }
}
