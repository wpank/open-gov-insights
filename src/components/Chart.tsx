import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, PointElement, LineElement, LineController, BarController,
    InteractionItem
} from 'chart.js';
import {
    Bar,
    Chart,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
} from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import {useEffect, useState} from "react";
import React, { MouseEvent, useRef } from 'react';
import styled from "styled-components";
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);



// Styled component named StyledButton
const StyledButton = styled.button`
  background-color: rgba(230,0,122,0.25);
  border-color: rgba(230,0,122,1);
  border-radius: 10px;
  font-size: 32px;
  color: white;
`;

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Kusama Open Gov Voters',
        },
        legend: {
            labels: {
                color:'rgba(255,255,255,0.9)',
            },
            title: {
                color:'rgba(255,255,255,0.9)',
                display: true,
                text: 'Kusama Open Gov Voters',
            },
        },
    },
    responsive: true,
    labelColor: 'rgba(255,255,255,0.9)',
    scales: {

        x: {
            stacked: true,
            grid: {
                tickColor: '#FF33AD',
                z: 0
            },
            border: {
                color: '#FF33AD'
            },
            title: {
                color: '#FF33AD'
            },
            ticks: {
                textStrokeColor: '#FF33AD',
                color: '#FF33AD',
                backdropPadding: 10,
                backdropColor: '#FF33AD'
            }
        },
        y: {
            border: {
                color: '#FF33AD'
            },
            stacked: true,
            // grid: {
            //     color: '#FF33AD'
            // },
            title: {
                color: '#FF33AD'
            },
            ticks: {
                color: '#FF33AD',
                textStrokeColor: '#FF33AD'
            }
        },
    },

};



export function OpenGovChart({}: {
}): JSX.Element {
    const [stats, setStats] = useState([]);
    const [data, setData] = useState({ datasets: []});
    const chartRef = useRef<ChartJS>(null);

    const [toggle, setToggle] = useState('direction');
    const [countToggle, setCountToggle] = useState('total')


    const printDatasetAtEvent = (dataset: InteractionItem[]) => {
        if (!dataset.length) return;

        const datasetIndex = dataset[0].datasetIndex;

        // @ts-ignore
        console.log(data.datasets[datasetIndex].label);
    };
    const printElementAtEvent = (element: InteractionItem[]) => {
        if (!element.length) return;

        const { datasetIndex, index } = element[0];
        // @ts-ignore
        console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
    };

    const printElementsAtEvent = (elements: InteractionItem[]) => {
        if (!elements.length) return;

        console.log(elements.length);
    };

    const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const { current: chart } = chartRef;

        if (!chart) {
            return;
        }

        printDatasetAtEvent(getDatasetAtEvent(chart, event));
        printElementAtEvent(getElementAtEvent(chart, event));
        printElementsAtEvent(getElementsAtEvent(chart, event));
    };

    useEffect( ()=> {
        console.log(toggle)
        const labels: string[] = [];
        for (const ref of stats){
            // @ts-ignore
            labels.push(`Ref #${ref.index}`)
        }
        let data: any;
        switch(toggle) {
            case 'direction':

                data = {
                    labels,
                    datasets: [
                        {
                            label: 'Abstain',
                            data: stats.map((ref: any) => countToggle == 'amount' ? ref.abstainVoters.total :  ref.abstainVoters.amount),
                            backgroundColor: 'rgba(169,204,41,0.5)',
                            borderColor: 'rgba(211,255,51,1)',
                            borderWidth: 1,
                            color: 'rgba(255,255,255,0.9)'
                        },
                        {
                            label: 'Aye',
                            data: stats.map((ref: any) =>  countToggle == 'amount' ? ref.ayeVoters.total: ref.ayeVoters.amount),
                            backgroundColor: 'rgba(72,204,129,0.5)',
                            borderColor: 'rgba(86,243,154,1)',
                            borderWidth: 1,
                            color: 'rgba(255,255,255,0.9)'
                        },
                        {
                            label: 'Nay',
                            data: stats.map((ref: any) => countToggle == 'amount' ? ref.nayVoters.total: ref.nayVoters.amount),
                            backgroundColor: 'rgba(230,0,122,0.25)',
                            borderColor: 'rgba(230,0,122,1)',
                            borderWidth: 1,
                            color: 'rgba(255,255,255,0.9)'
                        },
                    ]
                  }
                // @ts-ignore
                setData(data)
                break;
            case 'casting':
                data = {
                    labels,
                    datasets: [
                        {
                            label: 'Casting',
                            data: stats.map((ref: any) => countToggle == 'amount' ? ref.castingVoters.total : ref.castingVoters.amount),
                            backgroundColor: 'rgba(68,34,153,0.5)',
                            borderColor: 'rgba(109,58,238,1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Delegating',
                            data: stats.map((ref: any) => countToggle == 'amount' ? ref.delegatingVoters.total : ref.delegatingVoters.amount),
                            backgroundColor: 'rgba(230,0,122,0.25)',
                            borderColor: 'rgba(230,0,122,1)',
                            borderWidth: 1,
                        },
                    ]
                }
                // @ts-ignore
                setData(data)
                break;
            case 'community':
                data = {
                    labels,
                    datasets: [
                        {
                            label: 'Validator',
                            data: stats.map((ref: any) => countToggle == 'amount' ? ref?.validatorVoters?.total : ref?.validatorVoters.amount),
                            backgroundColor: 'rgba(230,0,122,0.25)',
                            borderColor: 'rgba(230,0,122,1)',
                            borderWidth: 1,
                            // color: 'rgba(255,255,255,0.9)'
                        },
                        {
                            label: 'Nominator',
                            data: stats.map((ref: any) => countToggle == 'amount' ? ref.nominatorVoters.total : ref?.nominatorVoters.amount),
                            backgroundColor: 'rgba(0,148,212,0.5)',
                            borderColor: 'rgba(0,178,255,1)',
                            borderWidth: 1,
                            color: 'rgba(255,255,255,0.9)'
                        },
                        {
                            label: 'Non-Staker',
                            data: stats.map((ref: any) =>  countToggle == 'amount' ? ref.nonStakerVoters.total : ref.nonStakerVoters.amount),
                            backgroundColor: 'rgba(169,204,41,0.5)',
                            borderColor: 'rgba(211,255,51,1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Fellowship',
                            data: stats.map((ref: any) => countToggle == 'amount' ? ref.fellowshipVoters.total : ref.fellowshipVoters.amount),
                            backgroundColor: 'rgba(72,204,129,0.5)',
                            borderColor: 'rgba(86,243,154,1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Society',
                            data: stats.map((ref: any) => countToggle == 'amount' ? ref.societyVoters.total : ref.societyVoters.amount),
                            backgroundColor: 'rgba(68,34,153,0.5)',
                            borderColor: 'rgba(109,58,238,1)',
                            borderWidth: 1
                        },
                    ]
                }
                // @ts-ignore
                setData(data)
                break;

        }
    }, [toggle, countToggle])

    // @ts-ignore
    useEffect(() => {


        const fetchVotes = () => {
            fetch('http://localhost:3300/opengov/referenda/stats/')
                .then((results) => {
                    return results.json();
                })
                .then((resultsJSON) => {
                    console.log(resultsJSON)
                    const sorted = resultsJSON.sort((a: any, b: any) => a.index - b.index)
                    setStats(sorted)
                    const labels: string[] = [];
                    const abstainVoters: number[] = [];
                    const ayeVoters: number[] = [];
                    const nayVoters: number[] = [];
                    const castingVoters: number[] = [];
                    const delegatingVoters: number[] = [];
                    const validatorVoters: number[] = [];
                    const nominatorVoters: number[] = [];
                    const nonStakerVoters: number[] = [];
                    const fellowshipVoters: number[] = [];
                    const societyVoters: number[] = [];
                    const identityVoters: number[] = [];
                    const allVoters: number[] = [];
                    for (const ref of sorted){
                        labels.push(`Ref #${ref.index}`)
                    }
                    const data2 = {
                        labels,
                        datasets: [


                            // {
                            //     label: 'Validator',
                            //     data: sorted.map((ref: any) => ref?.validatorVoters?.total),
                            //     backgroundColor: 'rgba(230,0,122,0.25)',
                            //     borderColor: 'rgba(230,0,122,1)',
                            //     borderWidth: 1,
                            //     // color: 'rgba(255,255,255,0.9)'
                            // },
                            // {
                            //     label: 'Nominator',
                            //     data: sorted.map((ref: any) => ref.nominatorVoters.total),
                            //     backgroundColor: 'rgba(0,148,212,0.5)',
                            //     borderColor: 'rgba(0,178,255,1)',
                            //     borderWidth: 1,
                            //     color: 'rgba(255,255,255,0.9)'
                            // },
                            // {
                            //     label: 'Non-Staker',
                            //     data: sorted.map((ref: any) => ref.nonStakerVoters.total),
                            //     backgroundColor: 'rgba(169,204,41,0.5)',
                            //     borderColor: 'rgba(211,255,51,1)',
                            //     borderWidth: 1,
                            // },
                            // {
                            //     label: 'Fellowship',
                            //     data: sorted.map((ref: any) => ref.fellowshipVoters.total),
                            //     backgroundColor: 'rgba(72,204,129,0.5)',
                            //     borderColor: 'rgba(86,243,154,1)',
                            //     borderWidth: 1,
                            // },
                            // {
                            //     label: 'Society',
                            //     data: sorted.map((ref: any) => ref.societyVoters.total),
                            //     backgroundColor: 'rgba(68,34,153,0.5)',
                            //     borderColor: 'rgba(109,58,238,1)',
                            //     borderWidth: 1
                            // },
                            // {
                            //     label: 'Identity',
                            //     data: sorted.map((ref: any) => ref.identityVoters.total),
                            //     backgroundColor: 'rgb(53, 92, 195)',
                            // },
                            {
                                // type: 'scatter' as const,
                                label: 'All',
                                data: sorted.map((ref: any) => ref.allVoters.total),
                                backgroundColor: 'rgb(53, 82, 190)',
                            },
                        ],
                    };
                    // @ts-ignore
                    setData(data2)
                    console.log(data2)
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        fetchVotes();
    }, []);


    return (<>

        <h1>{countToggle}</h1>
        <h1>{toggle}</h1>
        <StyledButton onClick={() => setCountToggle('amount')}>Amount</StyledButton>
        <StyledButton onClick={() => setCountToggle( 'total')}>Total</StyledButton>
        <StyledButton onClick={() => setToggle('direction')}>Vote Direction</StyledButton>
        <StyledButton onClick={() => setToggle( 'casting')}>Casting / Delegating</StyledButton>
        <StyledButton onClick={() => setToggle('community')}>Communities</StyledButton>
        <Bar ref={chartRef} onClick={onClick} options={options} data={data} />
    </>);

}
