import {
  Box, Image, ListItem, TabList, Tabs, UnorderedList,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../../axios';
import Icon from './Icon';
import { CustomTab } from './Animated';
import Heading from './Heading';
import Text from './Text';
import useStyle from '../hooks/useStyle';
import GridContainer from './GridContainer';

const MktRoadmap = ({ id, title, course, ...rest }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [data, setData] = useState([]);
  const { fontColor3 } = useStyle();
  const router = useRouter();

  axios.defaults.headers.common['Accept-Language'] = router.locale;
  useEffect(() => {
    if (typeof course === 'string') {
      axios.get(`${process.env.BREATHECODE_HOST}/v1/marketing/course/${course}`)
        .then((response) => {
          setData(response?.data?.course_translation?.course_modules || []);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return data?.length > 0 && (
    <>
      <GridContainer id={id} maxWidth="1280px" width="100%" height="auto" gridGap={{ base: '64px', lg: '24px' }} px={{ base: '10px', md: '0' }} {...rest}>
        <Tabs
          index={currentTabIndex}
          variant="unstyled"
          display="flex"
          flex={0.5}
          flexDirection={{ base: 'column', md: 'row' }}
          height={{ base: '100%', md: '528px' }}
          mt={{ base: '40px', md: 0 }}
          alignItems={{ base: 'flex-start', md: 'center' }}
          gridColumn="2 / span 3"
          position="relative"
        >
          {title && (
            <Heading
              as="h2"
              // fontSize="18px"
              fontWeight="700"
              lineHeight="30px"
              letterSpacing="0.05em"
              size="m"
              mb="10px"
              display={{ base: 'inherit', md: 'none' }}
            >
              {title}
            </Heading>
          )}
          <UnorderedList display={{ base: 'flex', md: 'none' }} listStyleType="none" flexDirection="column" mb="20px">
            {data.map((item, index) => (
              <ListItem variant="unstyled">
                <Heading size="xsm" fontWeight="500" color="blue.default" onClick={() => setCurrentTabIndex(index)}>
                  {item?.short_name || item?.name}
                </Heading>
              </ListItem>
            ))}
          </UnorderedList>
          <Box
            display={{ base: 'none', md: 'inherit' }}
            position="absolute"
            top="-20px"
            left="80px"
          >
            <Icon icon="curvedLine" width="80px" height="541px" />
          </Box>
          <TabList
            position="relative"
            display={{ base: 'none', md: 'inherit' }}
            height="100%"
            zIndex={99}
          >
            {data?.[0]?.slug && (
              <CustomTab onClick={() => setCurrentTabIndex(0)} top="10px" left="0" p="1rem 12px">
                {data?.[0]?.icon_url && (
                  <Image src={data?.[0]?.icon_url} height="35px" style={{ marginRight: '10px' }} />
                )}
                {data?.[0]?.short_name || data?.[0]?.name}
              </CustomTab>
            )}

            {data?.[1]?.slug && (
              <CustomTab onClick={() => setCurrentTabIndex(1)} top="112px" left="40px" p="1rem 12px">
                {data?.[1]?.icon_url && (
                  <Image src={data?.[1]?.icon_url} height="35px" style={{ marginRight: '10px' }} />
                )}
                {data?.[1]?.short_name || data?.[1]?.name}
              </CustomTab>
            )}
            {data?.[2]?.slug && (
              <CustomTab onClick={() => setCurrentTabIndex(2)} top="218px" left="70px" p="1rem 12px">
                {data?.[2]?.icon_url && (
                  <Image src={data?.[2]?.icon_url} height="35px" style={{ marginRight: '10px' }} />
                )}
                {data?.[2]?.short_name || data?.[2]?.name}
              </CustomTab>
            )}
            {data?.[3]?.slug && (
              <CustomTab onClick={() => setCurrentTabIndex(3)} bottom="144px" left="40px" p="1rem 12px">
                {data?.[3]?.icon_url && (
                  <Image src={data?.[3]?.icon_url} height="35px" style={{ marginRight: '10px' }} />
                )}
                {data?.[3]?.short_name || data?.[3]?.name}
              </CustomTab>
            )}
            {data?.[4]?.slug && (
              <CustomTab onClick={() => setCurrentTabIndex(4)} bottom="57px" left="30px" p="1rem 12px">
                {data?.[4]?.icon_url && (
                  <Image src={data?.[4]?.icon_url} height="35px" style={{ marginRight: '10px' }} />
                )}
                {data?.[4]?.short_name || data?.[4]?.name}
              </CustomTab>
            )}

          </TabList>
        </Tabs>
        <Box
          gridColumn="5 / span 5"
          display="flex"
          flexDirection="column"
          // marginLeft={{ base: '10px', lg: '-5rem' }}
          alignSelf="center"
          gridGap="10px"
        >
          {title && (
            <Heading
              as="h2"
              fontSize="18px"
              fontWeight="700"
              lineHeight="30px"
              letterSpacing="0.05em"
              color="blue.default"
              display={{ base: 'none', md: 'inherit' }}
            >
              {title}
            </Heading>
          )}
          <Text size={{ base: '18px', md: '26px' }} fontWeight="700" lineHeight="30px">
            {data[currentTabIndex]?.name}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            gridGap="4rem"
            height="12rem"
            overflowX="auto"
          >
            {data?.[currentTabIndex]?.description && (
              <Text
                key={data[currentTabIndex]?.slug}
                className="scroll-area"
                id={`${data[currentTabIndex]?.slug}`}
                minHeight="12rem"
                fontSize="14px"
                // mb="4rem"
                fontWeight="400"
                lineHeight="24px"
                letterSpacing="0.05em"
                color={fontColor3}
                dangerouslySetInnerHTML={{ __html: data?.[currentTabIndex]?.description }}
              />
            )}
          </Box>
        </Box>
      </GridContainer>
    </>
  );
};
MktRoadmap.propTypes = {
  course: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
};
MktRoadmap.defaultProps = {
  course: '',
  id: '',
  title: '',
};

export default MktRoadmap;
