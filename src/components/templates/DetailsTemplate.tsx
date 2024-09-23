import Grid from '@mui/material/Grid';
import ReturnButton, { ReturnButtonProps } from '../molecules/ReturnButton';
import Typography from '@mui/material/Typography';

// Update the DetailsTemplateProps interface to include gridSizes as a single object for xs, sm, and md
interface DetailsTemplateProps {
  title: string;
  children: React.ReactNode;
  returnButtonProps: ReturnButtonProps;
  gridSizes?: { xs?: number; sm?: number; md?: number };
  displaySubtitle?: boolean;
}

// Destructure gridSizes from props and set default values
const DetailsTemplate: React.FC<DetailsTemplateProps> = ({
  title,
  returnButtonProps,
  children,
  gridSizes = { xs: 10, sm: 8, md: 8 },
  displaySubtitle = true,
}) => {
  const { to, params, ...rest } = returnButtonProps;

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Grid
        item
        xs={gridSizes.xs}
        sm={gridSizes.sm}
        md={gridSizes.md}
        mx="auto"
      >
        <ReturnButton
          to={returnButtonProps.to}
          params={returnButtonProps.params}
          {...rest}
        />
        <Typography variant="h1" mb={4}>
          {title}
        </Typography>
        {displaySubtitle && (
          <Typography variant="h3" mb={4}>
            Información General
          </Typography>
        )}
        {children}
      </Grid>
    </Grid>
  );
};

export default DetailsTemplate;
