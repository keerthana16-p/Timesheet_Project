{{
    config(
        tags=['mart']
    )
}}
with 
stg_timesheet as (
    select * from  {{ ref('stg_timesheet') }}
),
total_hours as (
    select distinct User_Name,Total_hours from stg_timesheet where Total_hours>40 order by Total_hours desc
)
select * from total_hours
