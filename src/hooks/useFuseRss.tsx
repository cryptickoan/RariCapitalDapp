import { useQuery } from "react-query"

export const usePoolRSS = (poolId: string | number) => {
    const { data } = useQuery(poolId + " rss", () => {
        return fetch("https://app.rari.capital/api/rss?poolID=" + poolId)
            .then((res) => res.json())
            .catch((e) => { console.log(e)})
    })
    return data
}

export const getScore = (totalScore: number) => {
    if (totalScore >= 95) {
      return "A++";
    }
  
    if (totalScore >= 90) {
      return "A+";
    }
  
    if (totalScore >= 80) {
      return "A";
    }
  
    if (totalScore >= 70) {
      return "A-";
    }
  
    if (totalScore >= 60) {
      return "B";
    }
  
    if (totalScore >= 50) {
      return "C";
    }
  
    if (totalScore >= 40) {
      return "D";
    }
  
    if (totalScore >= 30) {
      return "F";
    } else {
      return "UNSAFE";
    }
  };
  