import Rect, { useEffect, useRef, useState } from "react";
import * as d3 from 'd3'
import './style.scss'
import SelectField, {DropdownHandle} from "../../input-field/custom-select-field";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { RevenueMetrics } from "../../../slices/revenue.slice";
import BarChartLoaderComponent from "../loaders/barchar/barchart-loader";
export interface ChartData{
    data:any
}

// Empty State Component
const EmptyChartState = () => (
    <div className="empty-chart-state">
        <svg width="100%" height="200" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="40" width="12" height="30" rx="4" fill="#E5E7EB" />
            <rect x="28" y="25" width="12" height="45" rx="4" fill="#E5E7EB" />
            <rect x="46" y="15" width="12" height="55" rx="4" fill="#E5E7EB" />
            <rect x="64" y="30" width="12" height="40" rx="4" fill="#E5E7EB" />
            <line x1="8" y1="70" x2="78" y2="70" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
        <p className="empty-state-text">No data available</p>
        <span className="empty-state-subtext">There's no revenue data to display for the selected period</span>
    </div>
);

const BarChart = () =>{

    const {revenue, revenueErr, isReveenueLoading} = useSelector((state:RootState)=>state.revenueMetrics)
    const dispatch = useDispatch();
    const filterList:string []= ['days', 'weeks', 'months', 'years', 'Custom'];
    const dropdownRef = useRef<DropdownHandle>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null)
    
    const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
    const MARGIN = { top: 40, right: 20, bottom: 36, left: 48 };
    
    const [selectedFilter, setSelectedFilter] = useState<any> ({
        period: ""
    })

    // Check if data is empty or undefined
    const hasData = revenue?.data && Array.isArray(revenue?.data) && revenue?.data?.length > 0;

    const geDispatchDetail =(value:string)=>{
        if(value){
            console.log(value, 'filter vau')
        }
        dispatch(RevenueMetrics(value)as any)
    }

    useEffect(()=>{

        geDispatchDetail(selectedFilter.filter)

    }, [0])
    
    useEffect(() => {
        if (!wrapperRef.current) return;
        
        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const { width } = entry.contentRect;
                setDimensions({ 
                    width, 
                    height: 350
                });
            }
        });

        resizeObserver.observe(wrapperRef.current);

        const { width } = wrapperRef.current.getBoundingClientRect();
        setDimensions({ 
            width, 
            height: Math.min(200, width * 0.22)
        });

        return () => resizeObserver.disconnect();
    }, []);
    
    useEffect(() => {
        
        console.log(isReveenueLoading, 'rev loader')
        console.log(revenue, )
        // if (!svgRef.current || !hasData) return;
        if (!svgRef.current || !revenue?.data?.length) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const innerWidth = dimensions.width - MARGIN.left - MARGIN.right;
        const innerHeight = dimensions.height - MARGIN.top - MARGIN.bottom;

        const g = svg
            .append("g")
            .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

        const maxValue:any = d3.max(revenue?.data, (d:any) => d.revenue) || 100;
        const yScale = d3
            .scaleLinear()
            .domain([0, maxValue * 1.05])
            .range([innerHeight, 0])
            .nice();

        const xScale = d3
            .scaleBand<string>()
            .domain(revenue?.data.map((d:any) => d.date))
            .range([0, innerWidth])
            .paddingInner(0.28)
            .paddingOuter(0.1);

        // Bars
        g.selectAll(".bar")
            .data(revenue?.data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", (d:any) => xScale(d.date) ?? 0)
            .attr("y", (d:any) => yScale(d.revenue))
            .attr("width", xScale.bandwidth())
            .attr("height", (d:any) => innerHeight - yScale(d.revenue))
            .attr("fill", "#DB4444")
            .attr("rx", 4);

        // X-axis labels
        g.selectAll(".day-label")
            .data(revenue?.data)
            .join("text")
            .attr("class", "day-label")
            .attr("x", (d:any) => (xScale(d.date) ?? 0) + xScale.bandwidth() / 2)
            .attr("y", innerHeight + 24)
            .attr("text-anchor", "middle")
            .attr("fill", "#6b7280")
            .attr("font-size", 12)
            .text((d:any) => d.date);

        // Y-axis labels
        const yTicks = yScale.ticks(5);
        g.selectAll(".y-label")
            .data(yTicks)
            .join("text")
            .attr("class", "y-label")
            .attr("x", -12)
            .attr("y", (d) => (yScale(d) ?? 0) + 4)
            .attr("text-anchor", "end")
            .attr("fill", "#6b7280")
            .attr("font-size", 11)
            .text((d) => `N${Math.round(d / 1000)}k`);

    }, [revenue?.data, dimensions]);
    
    const getData = (name:string, value:any) =>{

        setSelectedFilter((prevState:any)=>({
            ...prevState,
            [name]:value
        }))

        console.log(selectedFilter, 'filter')
        console.log(name, 'selected')
        geDispatchDetail(value)
    }
    // if(isReveenueLoading){
    //    return(
    //     <div>
    //       <DashboardLoader type="barchart"/>
    //     </div>
    //   )
    // }
    return (
        <div className="bar-chart-container">
            <div className="outer-title-div">
                <span className="chat-title">Overall Sales <span> {revenue?.overall_total.toLocaleString('en-US', {style: 'currency', currency: 'NGN'}) }</span></span>
                <span className="filters"> 
                    <SelectField
                        ref={dropdownRef}
                        options={filterList}
                        label="period"
                        preSelectedValue={selectedFilter?.period ? selectedFilter?.period:  filterList[0]}
                        onChange={getData}
                        fieldName="period"
                        
                    />
                </span>
            </div>
            <div className="bar-chart-div" ref={wrapperRef}>
                <span className="bar-chart-title">Revenue Analytics</span>
                
                {isReveenueLoading ? (
                    <BarChartLoaderComponent/>
                ) : revenue?.data?.length! > 0 ? (
                    <svg
                        ref={svgRef}
                        width={dimensions.width}
                        height={dimensions.height}
                        style={{ display: "block" }}
                    />
                ) : (
                    <EmptyChartState />
                )}
                {/* {revenue?.data.length! >0 ? (
                    <svg
                        ref={svgRef}
                        width={dimensions.width}
                        height={dimensions.height}
                        style={{ display: "block" }}
                    />
                ) : (
                    <EmptyChartState />
                )} */}
            </div>
        </div>
    )
}

export default BarChart