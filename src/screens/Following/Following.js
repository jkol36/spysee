import React, { useMemo } from 'react';
import { View, FlatList } from 'react-native';

import MainHeader from '../../components/MainHeader/MainHeader';
import Heading from '../../components/Heading/Heading';
import Title from '../../components/Title/Title';
import CategoryList from '../../components/CategoryList/CategoryList';
import StreamList from '../../components/StreamList/StreamList';
import ChannelList from '../../components/ChannelList/ChannelList';


import { Wrapper, Container, Main } from './styles';

const Following = () => {
  console.log('mainHeader', MainHeader)
  console.log('Heading', Heading)
  console.log('Title', Title)
  console.log('CategoryList', CategoryList)
  console.log('StreamList', StreamList)
  console.log('ChannelList', ChannelList)
  console.log('Wrapper', Wrapper)
  console.log('Container', Container)
  console.log('Main', Main)
  const { data, indices } = useMemo(() => {
    const items = [
      {
        key: 'PAGE_HEADING',
        render: () => <Heading>Following</Heading>
      },

      {
        key: 'FOLLOWED_CATEGORIES',
        render: () => <Title>Followed Categories</Title>,
        isTitle: true,
      },

      { key: 'C1', render: () => <CategoryList /> },

      {
        key: 'LIVE_CHANNELS',
        render: () => <Title>Live Channels</Title>,
        isTitle: true,
      },

      { key: 'C2', render: () => <StreamList /> },

      {
        key: 'CONTINUE_WATCHING',
        render: () => <Title>Continue watching</Title>,
        isTitle: true,
      },

      { key: 'C3', render: () => <StreamList /> },

      {
        key: 'OFFLINE_CHANNELS',
        render: () => <Title>Offline Channels</Title>,
        isTitle: true,
      },

      { key: 'C4', render: () => <ChannelList /> },
    ];

    const indices = [];

    items.forEach((item, index) => item.isTitle && indices.push(index));

    return {
      data: items,
      indices: indices
    }
  }, [])

  return (
    <Wrapper>
      <Container>
        <MainHeader />

        <Main >
          <FlatList
            data={data}
            renderItem={({ item }) => item.render()}
            keyExtractor={item => item.key}
            stickyHeaderIndices={indices}

            onRefresh={() => {}}
            refreshing={false}

          />
        </Main>
      </Container>
    </Wrapper>
  );

}

export default Following;