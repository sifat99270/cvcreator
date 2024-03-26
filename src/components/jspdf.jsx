"use client";

import {
  StyleSheet,
  Text,
  View,
  PDFViewer,
  Document,
  Page,
  Image,
  Line,
  Svg,
  Note,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  page: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  // So Declarative and unDRY 👌
  row1: {
    width: "27%",
  },
  row2: {
    width: "15%",
  },
  row3: {
    width: "15%",
  },
  row4: {
    width: "20%",
  },
  row5: {
    width: "27%",
  },
  logo: {
    width: "20%",
    height: "20%",
    backgroundColor: "red",
  },
  image: {
    width: 10,
    height: 10,
  },

  nameHead: {
    fontWeight: "500",
    fontSize: "25",
    textAlign: "center",
    width: "100%",
    textTransform: "uppercase",
  },
  profation: {
    fontWeight: "thin",
    fontSize: "15",
    textAlign: "center",
    width: "100%",
    padding: 5,
    textTransform: "uppercase",
  },
  line: {
    width: "100%",
    height: "10",
    marginTop: 5,
    padding: 0,
  },
  view1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    margin: "auto",
  },
  viewProfile:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    margin: "auto",
  },
  view2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    gap: 5,
    padding: 5,
  },
  view3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    fontSize: 10,
  },
  view4: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    fontSize: 10,
  },
  text: {
    fontWeight: "black",
  },
  viewcommon: {
    display: "flex",
    padding: 8,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image2: {
    width: 20,
    height: 20,
  },
});
const telephon =
  "data:image/png;base64,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";
const email =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAYFBMVEUAAAD////n5+c8PDz8/PzAwMC9vb34+PjMzMzFxcUVFRWWlpaQkJCJiYkMDAx+fn6dnZ0cHBy3t7fY2NixsbEjIyOjo6Pw8PBDQ0NfX18qKiqqqqp3d3dsbGxlZWVaWlodqJyJAAAEGklEQVR4nO2ba3uiMBCFYRcvICJWbLW17v//l2vsQz0TAkwgIfMh59MW0T3Pm8lkcktSgUpCGzApmuIqmuIqmuIqmuIqmuIqmuIqmuIqmuIqmuJKuqmPP0H1YTC1ra+XvwF1udZb3dTpmATX8aSTyovQnoq8G1Onz7CefjmRQM/PQT3lqclUUFbnbWo2lebBor1YkTyVNZvXX9tArD6B06bJklNSoqsgcYXxtCkflr6S5JaFZYWcslvysHR/PN2jq8XjqgBO2f7x4Jo82wtZ5QuzOueUU5K0IbTHuKqW9FRhjO9/HrWfHZDVgtF+hlyQHfRPCavF4qrociI6vD5OVwu5Ijmzw+npClktUjOQeDJ6oplhCVbFWssFZleLsjL0O7MraOK1Z1ZH4JSWQ29iZvCcr3BsGeCkROLKYwsWbE5Ky/RBTr9DlcDKV1wRTjvON0hceWGFnMw5s6sS+6APU2+2nJRuXlnheNcdg/u1w7hybQo51TZfvMEX3dYMxYR4arXDuHKZRSfFUyusZNytM2A9bstJCeNq5YoV1gVW8dQKR2c3lQyp6UbGuz7VjsfBajYnJcJqtqvKAScll3FFOFn3OxSp+ma5Qk9zOCntoJKZxcpJPLUirCbHlV1NNy7M7aupP4IxPiueWmEl8zapBSscWxxwUsK4yqf8AK4XzI6nX1fIyjquqsm1yrCwBa1Z4RjsJJ5a1cjK7quNH05KOMexYoXrdI5i/KWJrJDTu2tPGituZsB+55yTErJqeF/xzEnJug86HlvMerdjtQAnJRydx+KqWoSTZmqMFXLyaQqbLx2pr9b0XW/NV6aaBvJVo7/riVWt/z8DrNbdd72wwuQ5xurN8KqP5GngpGSqkCsDJy+syALtyDhI8hNOGByz0myU9E8qbV3FW+nSGWDeAZzmCjxlzwbzVOQZymF81EAfrLpg/JTDxokDJlJghQZ+A9vDxKFnimWsZL5MnjxMsXono8jqZxcA94AykgAcT0YHpu3I6lR/f9cneECbye20fXCBgyTUDDN+N3QcLnCMLAVpZcNL3eTtbilodNGsx5VpQHG1aMZYXjS6+jK+6mZ5kbUQW3eKh96QqRzkK+YyLHYFpU1/0xxns2JvGl228Ga2vQy9O7MPWmyDVPf2tNqmuQ//6rxtELJhxHj/fL8d/nEO7lhv1L6EnKRsrUnchPS7XVtN2q4dLHZdaMJGpMQjABIPS0g8VlIKPIAj8aiSxENdEo+/STwoKPFIpcTDpxKP6co60PyTjIQd/X5SOQg7JH9NBF4nEHnxgl5RCXOdp3NFRcRlnrN2mScFibn2BP+WeEFM4lW60JcOgZXo65kyL7JKvPKbirwcLUnRFFfRFFfRFFfRFFfRFFfRFFfRFFfRFFfRFFfRFFf/AbtbS8T9v6bxAAAAAElFTkSuQmCC";
const location =
  "data:image/jpeg;base64,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";
const bag =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKUAAACUCAMAAADF0xngAAAAY1BMVEX///8AAAD+/v77+/suLi7U1NT39/dwcHBra2uurq7o6OhRUVE+Pj4EBATt7e2FhYXf39/BwcGmpqY4ODgfHx8mJiYPDw+1tbVXV1eUlJRDQ0PMzMxjY2N6enoWFhZMTEydnZ08T3ptAAAEhElEQVR4nO2ci5aCIBCGCYTSvGtqean3f8oFWosKU9BMd/nP2bMci5nPiRkQLQCGCPZpkJXJ9eR2qZTfdD5YhnI6rYNSUG/mvCbS5E1DuVRKIBjWa7ZIj81+ykESHOg3J2IxlHNQGv0HQaSm6cedWLpehegrCB/rnYrqY4kmXqj2UQISWBtVHQKffgBzUUIEULrx1BA9j3bIYF80p6NEkNTMr2osaYea3IIp8AJNyvenAKJGnZGriQASeB6b0xFyoZoFptnG9lDleVwfeDDRXJTQL5jDAKl1i1kwCx9+jFIwwZq+yxyGQM0wSmgn1x/L0i0ppaNICVxDCRZAKRSprnr1UnnvlPK6LG8KlN3vNZRzUEqar++5WRMpxaMCDpA3hXHZ+d4OyqESKVrKx6O9+nSOA0M5kgs9bwm3ulMqqZMS8uX/bWYHCjswbCEIiCMTTuhqwwsRUZNLeyVYZtBHQJOSryO3xV6ic8bWtNVWUQ3tlZ1lBosas6joUELHTjuX3Z7OKtjrXjsf7OsA6qAUUJ+oUaYBoq8MvamXbyjVrxLHyFo/JbiXG/hYeb5A2VX63mh+Sh0ZypVTKld1Q/k3KddR1Q3ldJRmhlSl1JGhXDnlqqu6oZyWUk67tOwxlNNRymUo/x1lMytlo5c9ILwUfNNNa39tmNq9u7S4hH07yh05jglw8iPfrNS8HT5I6fmYO4BgvViS0z6ICPBxXH1uj7DZxdgHJAqKE9Gi5NnTFHZIICm3p4Oi/95xklnnAFPboV2wDBhb1d0gDwHAcXDYXEeS/sfPe/PuSWBToyEdUb8vjaPkRpPiiCFwyqP76+0VIA2eVMkor/9OR+zw7Eyy28GRlDcX5yikw9Suz9Jhmjz3x9JopgUb7Cgs25No03xcVfcE0LSi6YhIdNllDx44JRGuRtnVIBbO8fefVcclPVHa/zZj3CxMO/ckuzgEJIy26QMAoxTVUt5PwwpKBwE/37rS6WL6GdLalrQI48vOFeillFfO5lTTUwMODk7dNqekbHPU2l1KmgBR0IImj17gfVxWx5LlCh3Qv7GX1ohPrS8zq8pDQvy4OhwOqUuoGYIIQvyPUdLDbh0RiPyoTjrvcH2YkpPuaaAQv13J79E5RVVVRcjaJKQHEZu7dn2EH6T0vGuKZyc6y2Fc+iy1Q/4SfyAK0oM4D/bW9c1forwOsbt3dsNTpCRt/2FrqpmuezBLmTslhIlS9y9RolVQTh1LuUZSArJQSiF7qMvFUkLo51EU5T5cNGXr6ROUU2WPaAWipea46ActtBKFzwYWSbl9vvAZssaYnXKkDOWMlHIZSkP5Xcp1ZI+hNJSG8m9TymUoDeV3KdeRPYbSUBrKv00pl6E0lN+l7MieYvPRp3Tu4g9ZFFqUEOTcwjyUm03e9xi4PJaQ/WDFbKp7f85GHksqe2/No73d82BtZyyZCJ5HfU88vaUc+6Xz4RpQhropNSR0G9rkP3ikL/HbKj1kC9CQAC5GAo+8uQgtgnKcuxHZo+TYUBpKQ2kovy9DOZ3+A+U6ssdQ/gDWxm0Bc/GTJQAAAABJRU5ErkJggg==";
const people =
  "data:image/png;base64,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";
const education =
  "data:image/png;base64,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";
const flag =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAZlBMVEX///8UEhMAAADo6OkkJCMLDCHw8PDCwsI5NjcPDQ7j4+MgICChoKH6+vr19fXX19ebm5sZGRk8PDx+fn7MzMysrKx3d3dWVlZxcHFIR0iSkpK6urpra2unpqeysrJeXl4vLy+JiImgxLdIAAAEDElEQVR4nO2c65prMBiFK7FpFFHHonW4/5vcYqatoq1DDO2z3p/zEHl9STC67HYAAAAAAAAAAAAAAADwZdCsDMPQM/naHZmPlUQFIxWH+PTpOkZ8JIwpFZWRe1m7O7OgKqlNfiCKs3aH5nAkShNG9LV7NJ3zo4uwsdbu01SMtks10ry1OzUVryvDjp9amn2fzIfOGuPAujJs6PJs1Ujohpyh0CejsOTdbjY1OPf1NAuCLEt9zg2qTe6QZehZyu2pu98ZL2NR7qdJGB1IAxafy0DndEKPbH6JqxYUk06WuEJ7h5n5bHON65cw+hVo7lH/xT05Y8+wxR23boqQcP5YG7EA2H5Q1gXpKWaNOMFRko24veNOVZXr3vNvpMIeGVXrbmfxoIxfiFz3rbaIktQYdGzDicj98GQ/e9rwnotm2NmKpmV0fGty8ynOjv920FAzJ82Ds8OwU/CKU/d2pj0VeZLvB5pcm2Cxl/XU944V5MfHJmXIaGr7RjN93MAXM36Eya08ufO0d9rlrLbblCGzMx5sSGse6id3vMqvzzEuexcDX6wjnTalyOxo48aZKQ+D3c9V0p1Uw3WUovPoSk3xWNt3dZMis6PurcMPDzN+rkwrSkOHHPPstkppehkf2O9j7UIy2r5PhucTx1fHh+xzz/POkVpfa5+1uaAMPc0YXz0+Na+3WkrGvkipyiiWktG8P1dZTsaRNsLWl9FWqMtiMukahVlKxoQMZCADGchABjKQgQxkIAMZyEAGMpCBDGQgAxnIQAYykIEMZCADGchABjKQgQxkIAMZyEAGMpAZLTM/qDVThrGnPyEfCYlkuEyTYaTFTCdC5KT3R8vUnY+8JNN1v0Z3wvjt7+NfwcjBl+IyTkZUpPAykcy07+kUW6OGX7oTfao2Eymzf5SMyMflAW9qNLA1v1QnjDdCTlxanHqoTHXe85S+PKxl+yNDXdX5OctTGSgjQqXBy0zcFWNEWqVSyeV+tuO9THVMtRw+qkX4ZkB1RO4plDVXhsqIKFwwLhFqvI11MkYUN5FynXwpc2nK1CHFCcsmPxfPE2tVo8o+St+3Mp62TDNVK+LXE68AvIyKnvKIVPfBzaWtxS3aMnZMbiqxN2N+aqknfERq7of6wupGpwU/PdRJNvmFOKFMqMy9LtOsPOVxcajaPqpFHJ29RF+oJj90A3RpLpbiuJRyi2EbfnYxTfMSpD4ftLjPoSfayIMkMd8nxzdIf+j0Q4HMVoHMVoHMVoHMVoHMVoHMVoHMVoHMVoHMVoHMVoHMVoHMVoHMVtEaHziU9DZ+PWzv+gKFsEVfN/wJPFJI/SrINT/xH/8tDNOp0b/ABQAAAAAAAAAAAAAAAAAAAAAAAHiAfhE79YvY/fsi/gPCPmdL3tmUSAAAAABJRU5ErkJggg==";
export const ReactPdf = ({ data }) => {
  return data ? (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.table}>
          {/* header  */}
          {data["profile"] ? (
            <>
              <Text style={styles.nameHead}>{data["profile"]["name"]}</Text>
              <Text style={styles.profation}>
                {data["profile"]["profession"]}
              </Text>
              <Svg style={styles.line}>
                <Line
                  x1='0'
                  y1='0.3'
                  x2='1000'
                  y2='0.3'
                  strokeWidth={2}
                  stroke='rgb(0,0,0)'
                />
              </Svg>
            </>
          ) : null}
          {/* self information */}
          {data["profile"] ? (
            <>
              <View style={styles.viewProfile}>
                <View style={styles.view2}>
                  <View style={styles.view3}>
                    <Image style={styles.image} src={telephon} />
                    <Text>:{data["profile"]["phone"]}</Text>
                  </View>
                  <View style={styles.view3}>
                    <Image style={styles.image} src={email} />
                    <Text>:{data["profile"]["email"]}</Text>
                  </View>
                  <View style={styles.view3}>
                    <Image style={styles.image} src={location} />
                    <Text>:{data["profile"]["address"]}</Text>
                  </View>
                </View>
                <View style={styles.view2}>
                  <View style={styles.view4}>
                    <Text style={{ fontWeight: "extrabold", color: "#000" }}>
                      Date Of Birth:
                    </Text>
                    <Text>{data["profile"]["birth"]}</Text>
                  </View>
                  <View style={styles.view4}>
                    <Text style={{ fontWeight: "extrabold", color: "#000" }}>
                      Gender:
                    </Text>
                    <Text>{data["profile"]["gender"]}</Text>
                  </View>
                  <View style={styles.view4}>
                    <Text style={{ fontWeight: "extrabold", color: "#000" }}>
                      Marital Status:
                    </Text>
                    <Text>{data["profile"]["married"]}</Text>
                  </View>
                  <View style={styles.view4}>
                    <Text style={{ fontWeight: "extrabold", color: "#000" }}>
                      Nationality:
                    </Text>
                    <Text>{data["profile"]["nationality"]}</Text>
                  </View>
                </View>
              </View>
              <Svg style={styles.line}>
                <Line
                  x1='0'
                  y1='0.3'
                  x2='1000'
                  y2='0.3'
                  strokeWidth={2}
                  stroke='rgb(0,0,0)'
                />
              </Svg>
            </>
          ) : null}

          {/* summary */}
          {data["summary"] ? (
            <View style={styles.view1}>
              <Text
                style={{
                  paddingTop: 5,
                  paddingLeft: 15,
                  fontSize: 10,
                  lineHeight: 1.5,
                }}>
                {data["summary"] ? data["summary"]["text"] : ""}
              </Text>
            </View>
          ) : null}
          {/* work exprience */}
          {data["experience"] &&
          data["experience"] instanceof Array &&
          data["experience"].length > 0 ? (
            <>
              <View style={styles.view1}>
                <View style={styles.viewcommon}>
                  <Image style={styles.image2} src={bag} />
                  <Text style={styles.text}>Work Experience</Text>
                </View>
              </View>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {data["experience"] instanceof Array &&
                  data["experience"].length > 0 &&
                  data["experience"].map((item, i) => {
                    return (
                      <View
                        key={item["id"]}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "flex-start",
                        }}>
                        <View
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            padding: 10,
                          }}>
                          <Text style={{ fontSize: 10 }}>{item["start"]}-</Text>
                          <Text style={{ fontSize: 10 }}>{item["end"]}</Text>
                        </View>
                        <View style={{ width: "100%" }}>
                          <View
                            style={{ display: "flex", gap: 4, width: "100%" }}>
                            <Text style={{  fontWeight: "bold",fontSize:14  }}>
                              {item["title"]}
                            </Text>
                            <View
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                              }}>
                              <Text style={{ fontSize: 10, width: "50%" }}>
                                {item["city"]}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: "black",
                                  width: "50%",
                                }}>
                                {item["state"]}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              padding: 10,
                              width: "90%",
                              display: "flex",
                              gap: 5,
                            }}>
                            <Text style={{ fontSize: 8, lineHeight: 1.5 }}>
                              .{item['employer']}
                            </Text>
                          </View>
                          <Svg style={styles.line}>
                            <Line
                              x1='0'
                              y1='0.1'
                              x2='1000'
                              y2='0.1'
                              strokeWidth={2}
                              stroke='rgb(0,0,0)'
                            />
                          </Svg>
                        </View>
                      </View>
                    );
                  })}
              </View>
            </>
          ) : null}
          {/* education */}
          {data["education"] &&
          data["education"] instanceof Array &&
          data["education"].length > 0 ? (
            <>
              <View style={styles.view1}>
                <View style={styles.viewcommon}>
                  <Image style={styles.image2} src={education} />
                  <Text style={styles.text}>Education</Text>
                </View>
              </View>
              <View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {data["education"].map(item => {
                    return (
                      <View
                        key={item["id"]}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 5,
                        }}>
                        <View
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                          
                            padding: 10,
                          }}>
                          <Text style={{ fontSize: 10 }}>{item["start"]}-</Text>
                          <Text style={{ fontSize: 10 }}>{item["end"]}</Text>
                        </View>
                        <View style={{ width: "100%" }}>
                          <View
                            style={{ display: "flex", gap: 4, width: "100%" }}>
                            <Text style={{  fontWeight: "bold",fontSize:14  }}>
                              {item["school"]}
                            </Text>
                            <View
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                              }}>
                              <Text style={{ fontSize: 10, width: "50%" }}>
                                {item["studyfield"]}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: "black",
                                  width: "50%",
                                }}>
                                {item["city"]}
                              </Text>
                            </View>
                          </View>
                          <Svg style={styles.line}>
                          <Line
                            x1='0'
                            y1='0.001'
                            x2='1000'
                            y2='0.001'
                            strokeWidth={2}
                            stroke='rgb(0,0,0)'
                          />
                        </Svg>
                        </View>
                       
                      </View>
                    );
                  })}
                </View>
              </View>
            </>
          ) : null}
          {/* hobbies */}
          {data["hobbies"] &&
          data["hobbies"] instanceof Array &&
          data["hobbies"].length > 0 ? (
            <View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <View style={styles.view1}>
                <View style={styles.viewcommon}>
                  <Image style={styles.image2} src={flag} />
                  <Text style={styles.text}>Hobbies</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  gap: 5,
                  justifyContent: "center",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                <View
                  style={{
                    width: "70%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "5",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}>
                  {data["hobbies"].map(item => {
                    return (
                      <Text
                        key={item["id"]}
                        style={{
                          backgroundColor: "gray",
                          borderRadius: 5,
                          textAlign: "center",
                          fontSize: 12,
                          padding: 5,
                          width: "50%",
                        }}>
                        {item["name"]}
                      </Text>
                    );
                  })}
                </View>
              </View>
            </View>
          ) : null}
          {/* reference */}
          {data["reference"] instanceof Array &&
          data["reference"].length > 0 ? (
            <View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <View style={styles.view1}>
                <View style={styles.viewcommon}>
                  <Image style={styles.image2} src={people} />
                  <Text style={styles.text}>Reference</Text>
                </View>
              </View>
              <View
                style={{
                  width: "75%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  margin:"auto"
                }}>
                {data["reference"] &&
                  data["reference"].map(item => {
                    return (
                      <View
                        key={item["id"]}
                        style={{
                          width: "45%",
                          display: "flex",
                          gap: 5,
                          justifyContent:"flex-start"
                        }}>
                        <Text style={{ fontWeight: "bold",fontSize:14 }}>
                          {item["name"]}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                          {item["companyName"]}
                        </Text>
                        <Text style={{ fontSize: 10 }}>{item["mobile"]}</Text>
                        <Text style={{ fontSize: 10 }}>{item["email"]}</Text>
                        <Text style={{ fontSize: 10 }}>{item["position"]}</Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  ) : null;
};
export default ReactPdf;
