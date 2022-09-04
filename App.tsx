import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Animated, Button, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface AppState {
  box: number[][]
}

export default class App extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    box : [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  
  }

  helperBox = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  touchY: number | undefined;
  touchX: number | undefined;

  componentDidMount() {
    let numRow = Math.floor(Math.random() * 4)
    let numCol = Math.floor(Math.random() * 4)
    let numRow2 = Math.floor(Math.random() * 4) 
    let numCol2 = Math.floor(Math.random() * 4)
    while(numRow === numRow2 && numCol === numCol2){
      numRow2 = Math.floor(Math.random() * 4) 
      numCol2 = Math.floor(Math.random() * 4)
    }
    this.helperBox[numRow][numCol] = 2;
    this.helperBox[numRow2][numCol2] = 2;
    this.setState({box: this.helperBox})
     console.log(this.state.box);
  }

  addNewTwo = (helperBox : number[][]) => {
    let numRow = Math.floor(Math.random() * 4)
    let numCol = Math.floor(Math.random() * 4)
    while(helperBox[numRow][numCol] != 0){
      numRow = Math.floor(Math.random() * 4)
      numCol = Math.floor(Math.random() * 4)
    }
    helperBox[numRow][numCol] = 2;
    return helperBox;
  }

  peek = (array: number[]) => array[array.length - 1];

 mergeRowRight = (sparseRow: number[]) => {
  const row = sparseRow.filter(x => x !== 0);
  const result = [];
  while (row.length) {
    let value = row.pop();
    if (this.peek(row) === value){
       value += row.pop()!;
    }
    result.unshift(value);
  }
  while (result.length < 4) result.unshift(0);
  return result as number[];
}

  zip = (arrays : number[][]) => {
    const result = [];
    for (let i = 0; i < arrays[0].length; ++i) {
      result.push(arrays.map(array => array[i]));
    }
    return result;
  }
  
  mergeRowLeft = (row: number[]) => this.mergeRowRight([...row].reverse()).reverse();
  
  mergeRight = (board: number[][]) => board.map(this.mergeRowRight);
  mergeLeft = (board: number[][]) => board.map(this.mergeRowLeft);
  mergeUp = (board: number[][]) => 
  {
    return this.zip(this.zip(board).map(this.mergeRowLeft))
  };
  mergeDown = (board: number[][])=> {
   return this.zip(this.zip(board).map(this.mergeRowRight));
  }

  render(){
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}
    onTouchStart={e => {
      console.log('touch')
      this.touchY = e.nativeEvent.pageY,
      this.touchX = e.nativeEvent.pageX
    }}
    onTouchEnd={e => {
      if (this.touchY! - e.nativeEvent.pageY > 20) {
        console.log('Swiped up')
        this.helperBox = this.mergeUp(this.helperBox)
      } else if(this.touchY! - e.nativeEvent.pageY < -20){
        console.log('Swiped down')
        this.helperBox = this.mergeDown(this.helperBox)
      } else if (this.touchX! - e.nativeEvent.pageX > 20) {
        console.log('Swiped left')
        this.helperBox = this.mergeLeft(this.helperBox)
      } else if(this.touchX! - e.nativeEvent.pageX < -20){
        console.log('Swiped rigth')
        this.helperBox = this.mergeRight(this.helperBox)
      }
      this.helperBox = this.addNewTwo(this.helperBox);
      this.setState({box: this.helperBox})
    }}>
      <View style={styles.header}>
      <Text style={styles.headerText}>2048 by Vesko</Text>
      </View>
      <View style={styles.boxGrid}>
      <View style={styles.row}>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[0][0]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[0][1]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[0][2]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[0][3]}</Text></Animated.View></View>
      </View>
      <View style={styles.row}>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[1][0]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[1][1]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[1][2]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[1][3]}</Text></Animated.View></View>
      </View>
      <View style={styles.row}>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[2][0]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[2][1]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[2][2]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[2][3]}</Text></Animated.View></View>
      </View>
      <View style={styles.row}>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[3][0]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[3][1]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[3][2]}</Text></Animated.View></View>
        <View style={styles.bigSquare}><Animated.View style={styles.smallSquare}><Text style={styles.textNumber}> {this.state.box[3][3]}</Text></Animated.View></View>
      </View>
      </View>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  guesses: {
    margin: 20,
    padding: 20,
  },
  safeArea: {
      flex: 1,
      backgroundColor: '#A6A9BC',
      paddingTop: Platform.OS === 'android' ? 50 : 0
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 48,
  }, 
  row: {
    flexDirection: 'row',
  }, 
  bigSquare: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallSquare: {
    width: 90,
    height: 90,
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textNumber: {
    fontSize: 30
  },
  boxGrid: {
    margin: 40,
  }
});
