import { useEffect } from 'preact/hooks';
import { List, Paper, Typography, Box, Button } from '@mui/material';
import { useInjection } from '../../../shared/presentation/hooks/useInjection';
import { CategoryReadService } from '../../application/services/CategoryReadService';
import { CategoryWriteService } from '../../application/services/CategoryWriteService';
import { CategoryState } from '../../application/state/CategoryState';
import { CategoryComponent } from '../components/CategoryComponent';
import { CategorySkeleton } from '../components/CategorySkeleton';
import { NotificationDisplay } from '../../../shared/presentation/components/NotificationDisplay';

export const CategoryTreeContainer = () => {
  const readService = useInjection<CategoryReadService>(CategoryReadService);
  const writeService = useInjection<CategoryWriteService>(CategoryWriteService);
  const state = useInjection<CategoryState>(CategoryState);

  useEffect(() => {
    readService.load();
  }, []);

  const categories = state.categories.value;
  const selected = state.selected.value;
  const isLoading = state.loading.value;

  const handleSubmit = () => {
    writeService.submit();
  };

  return (
    <Box sx={{ p: 3, maxWidth: 400, mx: 'auto', width: '100%' }}>
      <Typography variant='h4' gutterBottom>Category Tree (DDD)</Typography>
      
      <Box sx={{ mb: 2 }}>
        <Button 
          variant='contained' 
          color='primary' 
          fullWidth 
          onClick={handleSubmit}
          disabled={isLoading || selected.selectedIds.length === 0}
        >
          {isLoading ? 'Submitting...' : 'Submit Selection'}
        </Button>
      </Box>

      <Paper elevation={3}>
        {isLoading && categories.count() === 0 ? (
          <CategorySkeleton />
        ) : (
          <List>
            {categories.items.map((category) => (
              <CategoryComponent
                key={category.id.getValue()}
                category={category}
                selectedState={selected}
                onToggle={(id) => writeService.toggle(id)}
                onExpand={(id) => readService.expand(id)}
              />
            ))}
          </List>
        )}
      </Paper>
      <NotificationDisplay />
    </Box>
  );
};
