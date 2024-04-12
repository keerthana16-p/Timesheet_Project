{{
    config(
        tags=['staging']
    )
}}

with 
resource_allocation as (
    select 
    projectname as Project_Name,
    username as User_Name,
    from {{ source('timesheet', 'resourceallocationdetails') }}
)
select * from resource_allocation