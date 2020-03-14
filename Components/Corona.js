import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, Picker, ScrollView} from 'react-native';
import {View, Text} from 'native-base';
const {width, height} = Dimensions.get('window');
import Carousel from 'react-native-snap-carousel';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const itemHorizontalMargin = wp(2);
const slideWidth = wp(75);

const Corona = () => {
  const sliderWidth = viewportWidth;
  const itemWidth = slideWidth + itemHorizontalMargin * 2;
  const [stats, setStats] = useState();
  const [country, setCountry] = useState();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState();
  const [error, setError] = useState();
  const [selectedValue, setSelectedValue] = useState('USA');
  const [daily, setDaily] = useState();

  const url = 'https://covid19.mathdro.id/api';

  useEffect(() => {
    console.log('Mounting or updating');
    async function fetchData() {
      setLoading(true);
      setError();
      console.log('Fetching Data');
      const data = await fetch(url)
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });
      const countrydata = await fetch(`${url}/countries`)
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });
      const countrydetails = await fetch(`${url}/countries/${selectedValue}`)
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });
      if (countrydetails.error) {
        setDetail({
          confirmed: {
            value: 0,
            detail: 'https://covid19.mathdro.id/api/countries/usa/confirmed',
          },
          recovered: {
            value: 0,
            detail: 'https://covid19.mathdro.id/api/countries/usa/recovered',
          },
          deaths: {
            value: 0,
            detail: 'https://covid19.mathdro.id/api/countries/usa/deaths',
          },
          lastUpdate: '2020-03-13T11:09:37.000Z',
        });
      } else {
        setDetail(countrydetails);
      }

      const dailydetail = await fetch(
        `https://covid19.mathdro.id/api/daily/2-14-2020`,
      )
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });

      setDaily(dailydetail);
      setCountry(countrydata);
      setStats(data);
      setLoading(false);
    }
    fetchData();
  }, [url, selectedValue]);
  console.log(daily);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: '#2B2f37',
          borderRadius: 20,
          height: 250,

          marginBottom: 20,
        }}>
        <View style={styles.slide}>
          <Text style={styles.title}>{item.countryRegion}</Text>
          <Text style={styles.countrytext}>province: {item.provinceState}</Text>
          <Text style={styles.countrytext}>Infected: {item.confirmed}</Text>
          <Text style={styles.countrytext}>Recovered: {item.recovered}</Text>
          <Text style={styles.countrytext}>Deaths: {item.deaths}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        <Text style={styles.title}>CORONOVIRUS(COVID-19) INFO</Text>
        {stats && (
          <View style={styles.total}>
            <Text style={styles.totaltext}>
              Infected: {stats.confirmed.value}
            </Text>
            <Text style={styles.totaltext}>
              Recovered: {stats.recovered.value}
            </Text>
            <Text style={styles.totaltext}>Deaths: {stats.deaths.value}</Text>
          </View>
        )}

        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          {country &&
            Object.entries(country.countries).map(([country, code]) => (
              <Picker.Item label={country} value={code} key={code} />
            ))}
        </Picker>

        {detail && (
          <View style={styles.country}>
            <Text style={styles.countrytext}>COUNTRYCODE: {selectedValue}</Text>
            <Text style={styles.countrytext}>
              Infected: {detail.confirmed.value}
            </Text>
            <Text style={styles.countrytext}>
              Recovered: {detail.recovered.value}
            </Text>
            <Text style={styles.countrytext}>
              Deaths: {detail.deaths.value}
            </Text>
          </View>
        )}
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            fontWeight: '500',
            color: '#fff',
            marginBottom: 20,
          }}>
          DAILY REPORT
        </Text>

        {daily && (
          <Carousel
            data={daily}
            renderItem={renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            itemHeight="400"
          />
        )}
      </View>
    </ScrollView>
  );
};
export default Corona;
const styles = StyleSheet.create({
  main: {
    backgroundColor: '#151921',
    minHeight: height,
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    paddingTop: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  total: {
    paddingTop: 12,
    backgroundColor: '#2B2f37',
    height: 150,
    width: width - 200,
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 18,
    margin: 20,
    fontSize: 30,
    fontWeight: '200',
  },
  totaltext: {
    color: '#fff',
    textAlign: 'center',
    margin: 8,
  },
  picker: {
    height: 50,
    width: 200,
    alignContent: 'center',
    alignSelf: 'center',
    color: '#fff',
  },
  country: {
    paddingTop: 12,
    backgroundColor: '#2B2f37',
    height: 200,
    width: width - 100,
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 18,
    margin: 30,
    fontSize: 30,
    fontWeight: '200',
  },
  countrytext: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    margin: 8,
  },
});
