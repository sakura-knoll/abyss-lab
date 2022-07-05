/** @jsxImportSource theme-ui */
import { NextPageContext } from 'next'
import SingleStigmataPage, {
  SingleStigmataPageProps,
} from '../../../components/pages/SingleStigmataPage'
import StigmataSetPage, {
  StigmataSetProps,
} from '../../../components/pages/StigmataSetPage'
import { generateI18NPaths, getI18NProps } from '../../../server/i18n'
import {
  listStigmata,
  getStigmaById,
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
  const stigmataData = getStigmaById(params.stigmataId, locale)!
  if (stigmataData != null) {
    return {
      props: {
        type: 'single',
        stigmataData: stigmataData,
        stigmataSetList: (
          (stigmataData.set != null &&
            getStigmataListBySetId(stigmataData.set!, locale)) ||
          []
        ).sort((a, b) => -a.type.localeCompare(b.type)),
        stigmataSet: getStigmataSetBySetId(stigmataData.set!, locale) || null,
        ...(await getI18NProps(locale)),
      },
    }
  }
  const [stigmataSetId] = params.stigmataId.split('-set')
  const stigmataSet = getStigmataSetBySetId(stigmataSetId, locale)!
  return {
    props: {
      type: 'set',
      stigmataSet,
      stigmataSetList: (
        getStigmataListBySetId(stigmataSet.id, locale) || []
      ).sort((a, b) => -a.type.localeCompare(b.type)),
      ...(await getI18NProps(locale)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: generateI18NPaths([
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
    ]),
    fallback: false,
  }
}
